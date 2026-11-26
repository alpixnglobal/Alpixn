"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ==========================================================================
   ALPIXN hero — procedural 6-axis robotic arm with a 3-finger gripper,
   neural-network field, scanning ring and ambient particles.
   Everything is generated in code (no external 3D assets / licences).
   ========================================================================== */

export type SceneTheme = "dark" | "light";
export type SceneQuality = "high" | "medium";

/** DOM nodes the scene writes live telemetry into (no React re-renders). */
export type TelemetryRefs = MutableRefObject<{
  yaw?: HTMLElement | null;
  shoulder?: HTMLElement | null;
  elbow?: HTMLElement | null;
  grip?: HTMLElement | null;
  phase?: HTMLElement | null;
  inference?: HTMLElement | null;
}>;

type Props = {
  theme: SceneTheme;
  quality: SceneQuality;
  active: boolean;
  telemetry?: TelemetryRefs;
  onReady?: () => void;
};

const PALETTES = {
  dark: {
    body: "#16294a",
    bodyMetal: 0.75,
    bodyRough: 0.32,
    joint: "#0a1424",
    gold: "#d99a19",
    glow: "#2ea8ff",
    netA: "#2ea8ff",
    netB: "#f6d77a",
    particle: "#9fd4ff",
    blending: THREE.AdditiveBlending,
    netOpacity: 0.55,
    key: "#ffe1a8",
    rim: "#2ea8ff",
    envIntensity: 0.9,
  },
  light: {
    body: "#eef1f6",
    bodyMetal: 0.2,
    bodyRough: 0.26,
    joint: "#13253f",
    gold: "#c2860f",
    glow: "#0878d1",
    netA: "#0878d1",
    netB: "#b07508",
    particle: "#3f86c9",
    blending: THREE.NormalBlending,
    netOpacity: 0.42,
    key: "#fff4de",
    rim: "#5aa9ec",
    envIntensity: 1.1,
  },
} as const;

/** Deterministic clock for frame capture (poster/video generation); live clock otherwise. */
type CaptureWindow = Window & { __alpixnCaptureTime?: number };
const sceneTime = (live: number) => (typeof window !== "undefined" ? (window as CaptureWindow).__alpixnCaptureTime : undefined) ?? live;
const sceneDelta = (dt: number) => (typeof window !== "undefined" && (window as CaptureWindow).__alpixnCaptureTime !== undefined ? 1 / 20 : dt);

/* ---------- helpers ---------- */

function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grd.addColorStop(0.6, "rgba(255,255,255,0.12)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const smooth = (x: number) => x * x * (3 - 2 * x); // smoothstep 0..1

// Key poses: yaw, shoulder, elbow, wrist, roll, grip (0 open → 1 closed)
const POSES = [
  [0.45, -0.32, 1.0, 0.85, 0.0, 0.15], // idle / observe
  [-0.55, -0.78, 1.5, 0.72, 0.6, 0.0], // reach toward data core
  [-0.55, -0.78, 1.5, 0.72, 0.6, 1.0], // grasp
  [0.15, -0.18, 0.72, 0.48, 1.8, 1.0], // lift & present
  [0.62, -0.5, 1.2, 0.8, 0.9, 1.0], // place
  [0.62, -0.5, 1.2, 0.8, 0.9, 0.0], // release
] as const;
const TIMES = [0, 2.4, 3.3, 5.8, 7.6, 8.4, 11]; // last entry loops back to pose 0
const CYCLE = TIMES[TIMES.length - 1];
const PHASES = ["Observing", "Planning path", "Grasping", "Presenting", "Placing", "Releasing"];

function samplePose(t: number, out: number[]) {
  const tt = t % CYCLE;
  let i = 0;
  while (i < TIMES.length - 1 && tt >= TIMES[i + 1]) i++;
  const a = POSES[i % POSES.length];
  const b = POSES[(i + 1) % POSES.length];
  const span = TIMES[i + 1] - TIMES[i];
  const k = smooth(Math.min(1, (tt - TIMES[i]) / span));
  for (let j = 0; j < 6; j++) out[j] = a[j] + (b[j] - a[j]) * k;
  return i;
}

/* ---------- environment & lights ---------- */

function Environment({ intensity }: { intensity: number }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      room.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
    };
  }, [gl, scene, intensity]);
  return null;
}

/* ---------- robotic arm ---------- */

function RoboticArm({ theme, telemetry, coreRef }: { theme: SceneTheme; telemetry?: TelemetryRefs; coreRef: MutableRefObject<THREE.Group | null> }) {
  const p = PALETTES[theme];
  const turret = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);
  const roll = useRef<THREE.Group>(null);
  const palm = useRef<THREE.Group>(null);
  const fingers = useRef<(THREE.Group | null)[]>([]);
  const tips = useRef<(THREE.Group | null)[]>([]);
  const pose = useMemo(() => new Array(6).fill(0) as number[], []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const home = useMemo(() => new THREE.Vector3(-1.55, 0.95, 0.9), []);
  const frame = useRef(0);

  const geo = useMemo(
    () => ({
      upper: new RoundedBoxGeometry(0.42, 1.7, 0.42, 4, 0.14),
      fore: new RoundedBoxGeometry(0.32, 1.35, 0.32, 4, 0.11),
      palm: new RoundedBoxGeometry(0.42, 0.22, 0.42, 3, 0.07),
      phal: new RoundedBoxGeometry(0.08, 0.26, 0.09, 2, 0.03),
      tip: new RoundedBoxGeometry(0.07, 0.2, 0.08, 2, 0.03),
    }),
    []
  );
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  const mats = useMemo(
    () => ({
      body: new THREE.MeshPhysicalMaterial({ color: p.body, metalness: p.bodyMetal, roughness: p.bodyRough, clearcoat: 0.8, clearcoatRoughness: 0.18 }),
      joint: new THREE.MeshStandardMaterial({ color: p.joint, metalness: 0.9, roughness: 0.35 }),
      gold: new THREE.MeshStandardMaterial({ color: p.gold, metalness: 1, roughness: 0.22 }),
      glow: new THREE.MeshStandardMaterial({ color: p.glow, emissive: p.glow, emissiveIntensity: theme === "dark" ? 2.4 : 1.2, toneMapped: false }),
    }),
    [p, theme]
  );
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame((state) => {
    const t = sceneTime(state.clock.elapsedTime);
    const phase = samplePose(t, pose);
    const micro = Math.sin(t * 1.7) * 0.02;
    const [yaw, sh, el, wr, rl, grip] = pose;
    if (turret.current) turret.current.rotation.y = yaw + micro;
    if (shoulder.current) shoulder.current.rotation.z = sh + micro * 0.5;
    if (elbow.current) elbow.current.rotation.z = el;
    if (wrist.current) wrist.current.rotation.z = wr;
    if (roll.current) roll.current.rotation.y = rl;
    // Mechanical fingers: open (spread) ↔ closed (curl inward)
    const curl = -0.55 + grip * 0.95;
    fingers.current.forEach((f) => f && (f.rotation.x = curl));
    tips.current.forEach((f) => f && (f.rotation.x = curl * 0.9));

    // Data core follows the gripper while grasped, otherwise floats home
    const core = coreRef.current;
    if (core && palm.current) {
      const holding = (t % CYCLE) > TIMES[2] && (t % CYCLE) < TIMES[5];
      if (holding) {
        palm.current.getWorldPosition(tmp);
        tmp.y += 0.05;
        core.position.lerp(tmp, 0.25);
      } else {
        tmp.copy(home);
        tmp.y += Math.sin(t * 1.4) * 0.08;
        core.position.lerp(tmp, 0.06);
      }
    }

    // Telemetry → DOM (throttled)
    frame.current++;
    const tel = telemetry?.current;
    if (tel && frame.current % 6 === 0) {
      const deg = (r: number) => `${(r * 57.2958).toFixed(1)}°`;
      if (tel.yaw) tel.yaw.textContent = deg(yaw);
      if (tel.shoulder) tel.shoulder.textContent = deg(sh);
      if (tel.elbow) tel.elbow.textContent = deg(el);
      if (tel.grip) tel.grip.textContent = `${Math.round(grip * 100)}%`;
      if (tel.phase) tel.phase.textContent = PHASES[phase % PHASES.length];
      if (tel.inference) tel.inference.textContent = `${(96 + Math.sin(t * 0.9) * 2.6).toFixed(1)}%`;
    }
  });

  const finger = (i: number) => {
    const a = (i / 3) * Math.PI * 2;
    return (
      <group key={i} rotation={[0, a, 0]}>
        <group position={[0, -0.1, 0.15]} ref={(el) => void (fingers.current[i] = el)}>
          <mesh geometry={geo.phal} material={mats.body} position={[0, -0.14, 0]} />
          <mesh material={mats.gold} position={[0, -0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.11, 16]} />
          </mesh>
          <group position={[0, -0.28, 0]} ref={(el) => void (tips.current[i] = el)}>
            <mesh geometry={geo.tip} material={mats.joint} position={[0, -0.11, 0]} />
            <mesh material={mats.glow} position={[0, -0.21, 0.02]}>
              <sphereGeometry args={[0.022, 12, 12]} />
            </mesh>
          </group>
        </group>
      </group>
    );
  };

  return (
    <group position={[0.35, -1.25, 0]}>
      {/* Base */}
      <mesh material={mats.joint} position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.16, 64]} />
      </mesh>
      <mesh material={mats.gold} position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.86, 0.025, 12, 96]} />
      </mesh>
      <mesh material={mats.body} position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.62, 0.78, 0.3, 64]} />
      </mesh>
      <mesh material={mats.glow} position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.014, 8, 96]} />
      </mesh>

      {/* Turret (yaw) */}
      <group ref={turret} position={[0, 0.5, 0]}>
        <mesh material={mats.body} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.5, 0.58, 0.44, 48]} />
        </mesh>
        <mesh material={mats.gold} position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 10, 64]} />
        </mesh>

        {/* Shoulder (pitch) */}
        <group ref={shoulder} position={[0, 0.72, 0]}>
          <mesh material={mats.joint} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.62, 40]} />
          </mesh>
          <mesh material={mats.gold} position={[0, 0, 0.32]}>
            <torusGeometry args={[0.24, 0.03, 12, 48]} />
          </mesh>
          <mesh material={mats.glow} position={[0, 0, 0.335]}>
            <circleGeometry args={[0.07, 24]} />
          </mesh>
          <mesh geometry={geo.upper} material={mats.body} position={[0, 0.9, 0]} />
          <mesh material={mats.glow} position={[0.215, 0.9, 0]}>
            <boxGeometry args={[0.012, 1.1, 0.06]} />
          </mesh>

          {/* Elbow (pitch) */}
          <group ref={elbow} position={[0, 1.78, 0]}>
            <mesh material={mats.joint} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.27, 0.27, 0.5, 36]} />
            </mesh>
            <mesh material={mats.gold} position={[0, 0, 0.26]}>
              <torusGeometry args={[0.18, 0.025, 10, 40]} />
            </mesh>
            <mesh geometry={geo.fore} material={mats.body} position={[0, 0.72, 0]} />
            <mesh material={mats.glow} position={[0.165, 0.72, 0]}>
              <boxGeometry args={[0.01, 0.8, 0.05]} />
            </mesh>

            {/* Wrist (pitch) */}
            <group ref={wrist} position={[0, 1.42, 0]}>
              <mesh material={mats.joint} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.19, 0.19, 0.38, 32]} />
              </mesh>
              {/* Wrist roll */}
              <group ref={roll} position={[0, 0.26, 0]}>
                <mesh material={mats.gold}>
                  <cylinderGeometry args={[0.16, 0.18, 0.12, 32]} />
                </mesh>
                <group ref={palm} position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]}>
                  <mesh geometry={geo.palm} material={mats.body} />
                  <mesh material={mats.glow} position={[0, -0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.07, 0.1, 32]} />
                  </mesh>
                  {[0, 1, 2].map(finger)}
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ---------- holographic data core the arm manipulates ---------- */

function DataCore({ theme, groupRef, glowTex }: { theme: SceneTheme; groupRef: MutableRefObject<THREE.Group | null>; glowTex: THREE.Texture }) {
  const p = PALETTES[theme];
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const shellGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.26, 1)), []);
  useEffect(() => () => shellGeo.dispose(), [shellGeo]);

  useFrame((s) => {
    const t = sceneTime(s.clock.elapsedTime);
    if (shell.current) {
      shell.current.rotation.y = t * 0.6;
      shell.current.rotation.x = t * 0.25;
    }
    if (inner.current) inner.current.scale.setScalar(1 + Math.sin(t * 3) * 0.08);
  });

  return (
    <group ref={groupRef} position={[-1.55, 0.95, 0.9]}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.12, 2]} />
        <meshStandardMaterial color={p.netB} emissive={p.netB} emissiveIntensity={theme === "dark" ? 2.2 : 0.9} toneMapped={false} />
      </mesh>
      <lineSegments ref={shell} geometry={shellGeo}>
        <lineBasicMaterial color={p.netA} transparent opacity={0.9} blending={p.blending} depthWrite={false} />
      </lineSegments>
      <sprite scale={[1.2, 1.2, 1]}>
        <spriteMaterial map={glowTex} color={p.netB} transparent opacity={theme === "dark" ? 0.55 : 0.35} blending={p.blending} depthWrite={false} />
      </sprite>
    </group>
  );
}

/* ---------- neural network field ---------- */

function NeuralField({ theme, quality, glowTex }: { theme: SceneTheme; quality: SceneQuality; glowTex: THREE.Texture }) {
  const p = PALETTES[theme];
  const nodeCount = quality === "high" ? 90 : 55;
  const pulseCount = quality === "high" ? 28 : 14;

  const data = useMemo(() => {
    // Deterministic pseudo-random so SSR/CSR and captures are stable
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      const r = 2.6 + rnd() * 1.4;
      nodes.push(new THREE.Vector3(r * Math.sin(ph) * Math.cos(th) * 1.25, r * Math.cos(ph) * 0.75 + 0.6, r * Math.sin(ph) * Math.sin(th) * 0.6 - 2.4));
    }
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) if (nodes[i].distanceTo(nodes[j]) < 1.35) edges.push([i, j]);

    const nodePos = new Float32Array(nodes.length * 3);
    const nodeCol = new Float32Array(nodes.length * 3);
    const cA = new THREE.Color(p.netA);
    const cB = new THREE.Color(p.netB);
    nodes.forEach((n, i) => {
      n.toArray(nodePos, i * 3);
      (i % 5 === 0 ? cB : cA).toArray(nodeCol, i * 3);
    });
    const linePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      nodes[a].toArray(linePos, i * 6);
      nodes[b].toArray(linePos, i * 6 + 3);
    });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeCol, 3));
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pulseCount * 3), 3));
    const pulses = Array.from({ length: pulseCount }, (_, i) => ({ edge: Math.floor(rnd() * edges.length), t: rnd(), speed: 0.25 + rnd() * 0.5, dir: i % 2 }));
    return { nodes, edges, nodeGeo, lineGeo, pulseGeo, pulses };
  }, [nodeCount, pulseCount, p.netA, p.netB]);

  useEffect(
    () => () => {
      data.nodeGeo.dispose();
      data.lineGeo.dispose();
      data.pulseGeo.dispose();
    },
    [data]
  );

  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  useFrame((s, rawDt) => {
    const t = sceneTime(s.clock.elapsedTime);
    const dt = sceneDelta(rawDt);
    if (group.current) group.current.rotation.y = Math.sin(t * 0.08) * 0.25;
    if (lineMat.current) lineMat.current.opacity = p.netOpacity * (0.55 + Math.sin(t * 0.8) * 0.15);
    const pos = data.pulseGeo.attributes.position as THREE.BufferAttribute;
    data.pulses.forEach((pl, i) => {
      pl.t += dt * pl.speed;
      if (pl.t >= 1) {
        pl.t = 0;
        pl.edge = (pl.edge * 31 + 17) % data.edges.length;
      }
      const [a, b] = data.edges[pl.edge] ?? [0, 0];
      const A = data.nodes[pl.dir ? a : b];
      const B = data.nodes[pl.dir ? b : a];
      pos.setXYZ(i, A.x + (B.x - A.x) * pl.t, A.y + (B.y - A.y) * pl.t, A.z + (B.z - A.z) * pl.t);
    });
    pos.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={data.lineGeo}>
        <lineBasicMaterial ref={lineMat} color={p.netA} transparent opacity={p.netOpacity * 0.6} blending={p.blending} depthWrite={false} />
      </lineSegments>
      <points geometry={data.nodeGeo}>
        <pointsMaterial size={0.09} map={glowTex} vertexColors transparent opacity={0.95} blending={p.blending} depthWrite={false} sizeAttenuation />
      </points>
      <points geometry={data.pulseGeo}>
        <pointsMaterial size={0.16} map={glowTex} color={p.netB} transparent opacity={1} blending={p.blending} depthWrite={false} sizeAttenuation />
      </points>
    </group>
  );
}

/* ---------- floor scanner + particles ---------- */

function FloorScanner({ theme, glowTex }: { theme: SceneTheme; glowTex: THREE.Texture }) {
  const p = PALETTES[theme];
  const ring = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((s) => {
    const k = (sceneTime(s.clock.elapsedTime) % 3.2) / 3.2;
    if (ring.current) ring.current.scale.setScalar(0.9 + k * 2.2);
    if (ringMat.current) ringMat.current.opacity = (1 - k) * (theme === "dark" ? 0.7 : 0.45);
  });
  return (
    <group position={[0.35, -1.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial map={glowTex} color={p.glow} transparent opacity={theme === "dark" ? 0.35 : 0.18} blending={p.blending} depthWrite={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[1.0, 1.03, 96]} />
        <meshBasicMaterial ref={ringMat} color={p.gold} transparent blending={p.blending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.45, 1.46, 96]} />
        <meshBasicMaterial color={p.glow} transparent opacity={0.35} blending={p.blending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Particles({ theme, quality, glowTex }: { theme: SceneTheme; quality: SceneQuality; glowTex: THREE.Texture }) {
  const p = PALETTES[theme];
  const count = quality === "high" ? 420 : 180;
  const geo = useMemo(() => {
    let seed = 13;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd() - 0.5) * 12;
      a[i * 3 + 1] = (rnd() - 0.3) * 7;
      a[i * 3 + 2] = (rnd() - 0.7) * 8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    const t = sceneTime(s.clock.elapsedTime);
    if (ref.current) {
      ref.current.rotation.y = t * 0.015;
      ref.current.position.y = Math.sin(t * 0.2) * 0.15;
    }
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} map={glowTex} color={p.particle} transparent opacity={theme === "dark" ? 0.7 : 0.45} blending={p.blending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/* ---------- camera rig: mouse parallax + scroll response ---------- */

function CameraRig() {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const target = useMemo(() => new THREE.Vector3(0, 0.95, 0), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    const s = scroll.current;
    const tx = 0.4 + pointer.current.x * 0.6 + s * 1.2;
    const ty = 1.7 - pointer.current.y * 0.3 + s * 1.2;
    const tz = 10.2 - s * 1.8;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z += (tz - camera.position.z) * 0.04;
    camera.lookAt(target);
  });
  return null;
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  const frames = useRef(0);
  useFrame(() => {
    if (fired.current) return;
    if (++frames.current > 2) {
      fired.current = true;
      onReady?.();
    }
  });
  return null;
}

/* ---------- root ---------- */

function SceneContents({ theme, quality, telemetry, onReady }: Omit<Props, "active">) {
  const p = PALETTES[theme];
  const coreRef = useRef<THREE.Group | null>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);
  useEffect(() => () => glowTex.dispose(), [glowTex]);

  return (
    <>
      <Environment intensity={p.envIntensity} />
      <ambientLight intensity={theme === "dark" ? 0.25 : 0.6} />
      <directionalLight position={[4, 6, 5]} intensity={theme === "dark" ? 2.2 : 2.6} color={p.key} />
      <directionalLight position={[-5, 3, -4]} intensity={theme === "dark" ? 3 : 1.4} color={p.rim} />
      <pointLight position={[-1.6, 1, 1.2]} intensity={theme === "dark" ? 6 : 2.5} distance={4} color={p.netB} />

      <NeuralField theme={theme} quality={quality} glowTex={glowTex} />
      <Particles theme={theme} quality={quality} glowTex={glowTex} />
      <FloorScanner theme={theme} glowTex={glowTex} />
      <RoboticArm theme={theme} telemetry={telemetry} coreRef={coreRef} />
      <DataCore theme={theme} groupRef={coreRef} glowTex={glowTex} />
      <CameraRig />
      <ReadySignal onReady={onReady} />
    </>
  );
}

export default function RoboticsScene({ theme, quality, active, telemetry, onReady }: Props) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0.4, 1.7, 10.2], fov: 34, near: 0.1, far: 60 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = theme === "dark" ? 1.05 : 1.0;
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContents theme={theme} quality={quality} telemetry={telemetry} onReady={onReady} />
    </Canvas>
  );
}
