import type { Metadata } from "next";
import { Save, Trash2, UserPlus } from "lucide-react";

import { deleteTeamMemberAction, resetMemberTwoFactorAction, saveTeamMemberAction } from "@/admin/actions/growth-actions";
import { AdminField, AdminInput, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { connectToDatabase } from "@/lib/db";
import { AdminUserModel } from "@/lib/growth/models";
import { ROLES, type Role } from "@/lib/rbac";

export const metadata: Metadata = { title: "Team & roles" };

const card = `${adminCardClassName} p-5 sm:p-6`;
const select = "w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[13.5px] text-fg outline-none focus:border-tech";
const ASSIGNABLE = (Object.keys(ROLES) as Role[]).filter((r) => r !== "owner");

type Member = { email: string; name: string; role: Role; active: boolean; totpSecretEnc?: string; lastLoginAt?: Date | null };

async function members() {
  try {
    await connectToDatabase();
    return (await AdminUserModel.find().sort({ createdAt: 1 }).select("email name role active totpSecretEnc lastLoginAt").lean()) as unknown as Member[];
  } catch {
    return null;
  }
}

function RoleSelect({ value }: { value?: Role }) {
  return (
    <select name="role" defaultValue={value ?? "sales"} className={select} aria-label="Role">
      {ASSIGNABLE.map((r) => (
        <option key={r} value={r}>
          {ROLES[r].label}
        </option>
      ))}
    </select>
  );
}

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ status?: string; error?: string }> }) {
  const p = await searchParams;
  const flash = getAdminFlashMessage(p.status, p.error);
  const list = await members();

  return (
    <AdminShell title="Team & roles" description="Give team members their own login with only the access their role needs." activePath="/admin/users">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      {!list ? <StatusNotice tone="error" message="Database unavailable." /> : null}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
        <div className="grid gap-4">
          <section className={card}>
            <p className="text-[13.5px] text-fg">
              <strong>Owner:</strong> {process.env.ADMIN_EMAIL ? "set on the server (ADMIN_EMAIL)" : "not configured"} — full access, manages team members, security and 2FA from Admin → Security.
            </p>
          </section>
          {list?.map((m) => (
            <section key={m.email} className={card}>
              <form action={saveTeamMemberAction} className="grid gap-3 md:grid-cols-[1fr_1fr_180px] md:items-end">
                <input type="hidden" name="email" value={m.email} />
                <div className="md:col-span-3 flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="font-semibold text-fg">{m.email}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${m.active ? "bg-[#1f9d55]/15 text-[#15803d] dark:text-[#6ee7a0]" : "bg-fg/10 text-fg-muted"}`}>{m.active ? "active" : "disabled"}</span>
                  <span className="text-[11.5px] text-fg-muted">{m.totpSecretEnc ? "2FA on" : "2FA off"}</span>
                  <span className="text-[11.5px] text-fg-muted">· last login {m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleString("en-IN") : "never"}</span>
                </div>
                <AdminField label="Name">
                  <AdminInput name="name" defaultValue={m.name} />
                </AdminField>
                <AdminField label="New password" hint="Leave empty to keep. Changing it signs them out.">
                  <AdminInput name="password" type="password" autoComplete="new-password" minLength={12} />
                </AdminField>
                <AdminField label="Role">
                  <RoleSelect value={m.role} />
                </AdminField>
                <label className="flex items-center gap-2 text-[13px] text-fg">
                  <input type="checkbox" name="active" defaultChecked={m.active} className="h-4 w-4 accent-[#0878d1]" /> Can sign in
                </label>
                <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                  <button className="btn-brand !px-4 !py-2 text-[13px]">
                    <Save className="h-4 w-4" /> Save
                  </button>
                </div>
              </form>
              <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                {m.totpSecretEnc ? (
                  <form action={resetMemberTwoFactorAction}>
                    <input type="hidden" name="email" value={m.email} />
                    <button className="rounded-lg border border-line px-3 py-1.5 text-[12.5px] text-fg-muted hover:text-fg">Reset 2FA (lost phone)</button>
                  </form>
                ) : null}
                <form action={deleteTeamMemberAction}>
                  <input type="hidden" name="email" value={m.email} />
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/40 px-3 py-1.5 text-[12.5px] text-rose-700 hover:bg-rose-500/10 dark:text-rose-200">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </form>
              </div>
            </section>
          ))}

          <section className={card}>
            <h2 className="flex items-center gap-2 font-display text-[16px] font-bold text-fg">
              <UserPlus className="h-5 w-5 text-[#0878d1]" /> Add team member
            </h2>
            <form action={saveTeamMemberAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <AdminField label="Email">
                <AdminInput name="email" type="email" required />
              </AdminField>
              <AdminField label="Name">
                <AdminInput name="name" />
              </AdminField>
              <AdminField label="Password" hint="12+ characters, letters and numbers. Share it privately; they can change it in My account.">
                <AdminInput name="password" type="password" autoComplete="new-password" minLength={12} required />
              </AdminField>
              <AdminField label="Role">
                <RoleSelect />
              </AdminField>
              <div className="md:col-span-2 flex justify-end">
                <button className="btn-brand !px-5 !py-2.5 text-[13.5px]">
                  <UserPlus className="h-4 w-4" /> Add member
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className={card}>
          <h2 className="font-display text-[16px] font-bold text-fg">Roles</h2>
          <ul className="mt-3 space-y-3 text-[13px]">
            {(Object.keys(ROLES) as Role[]).map((r) => (
              <li key={r}>
                <span className="font-semibold text-fg">{ROLES[r].label}</span>
                <span className="block text-fg-muted">{ROLES[r].description}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </AdminShell>
  );
}
