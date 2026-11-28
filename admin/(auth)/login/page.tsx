import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import { loginAdminAction } from "@/admin/actions/admin-actions";
import { getAdminSession } from "@/lib/admin-auth";
import { isTwoFactorEnabled } from "@/lib/totp";

export const dynamic = "force-dynamic";

/** Show the code field when any team member uses 2FA (members without it leave it empty). */
async function anyMemberTwoFactor() {
  if (!process.env.MONGODB_URI) return false;
  try {
    const { connectToDatabase } = await import("@/lib/db");
    const { AdminUserModel } = await import("@/lib/growth/models");
    await connectToDatabase();
    return Boolean(await AdminUserModel.exists({ active: true, totpSecretEnc: { $nin: ["", null] } }));
  } catch {
    return false;
  }
}

export const metadata: Metadata = {
  title: "Admin Login",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  await connection();

  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const twoFactor = (await isTwoFactorEnabled()) || (await anyMemberTwoFactor());

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-fg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(8,120,209,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,154,25,0.12),transparent_26%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <section className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-gold)] bg-[var(--surface-2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
              <ShieldCheck className="h-4 w-4" />
              ALPIXN CMS
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-3xl md:text-4xl font-bold leading-tight tracking-[-0.03em] text-fg">Authorised team members only.</h1>
              <p className="max-w-xl text-base font-normal leading-relaxed text-fg-muted">This area is protected. Sign-in attempts are limited and monitored.</p>
            </div>
          </section>

          <section className="rounded-[32px] border border-line bg-[var(--surface)] p-6 shadow-[0_30px_120px_-70px_rgba(8,120,209,0.55)] sm:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Protected Access</p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.03em] text-fg">Admin login</h2>
              </div>

              {params.error ? (
                <div className="rounded-[22px] border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                  {decodeURIComponent(params.error)}
                </div>
              ) : null}

              <form action={loginAdminAction} className="grid gap-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-fg">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="w-full rounded-[18px] border border-line bg-[var(--surface-2)] px-4 py-3 text-sm md:text-base font-normal text-fg outline-none transition placeholder:text-fg-subtle focus:border-tech"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-semibold text-fg">
                    Password
                  </label>
                  <div className="flex items-center gap-3 rounded-[18px] border border-line bg-[var(--surface-2)] px-4 py-3 focus-within:border-tech">
                    <LockKeyhole className="h-4 w-4 text-gold" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="w-full bg-transparent text-sm md:text-base font-normal text-fg outline-none placeholder:text-fg-subtle"
                    />
                  </div>
                </div>

                {twoFactor ? (
                  <div className="space-y-2">
                    <label htmlFor="otp" className="text-sm font-semibold text-fg">
                      Authentication code
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      inputMode="numeric"
                      pattern="[0-9 ]{6,7}"
                      maxLength={7}
                      placeholder="6-digit code (if two-factor login is on)"
                      autoComplete="one-time-code"
                      className="w-full rounded-[18px] border border-line bg-[var(--surface-2)] px-4 py-3 text-sm md:text-base tracking-[0.3em] text-fg outline-none transition placeholder:tracking-normal placeholder:text-fg-subtle focus:border-tech"
                    />
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="btn-brand w-full"
                >
                  Sign in to dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <Link href="/" className="inline-flex items-center gap-2 text-sm md:text-base font-medium leading-snug text-tech transition hover:text-gold">
                Back to public website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
