import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { connection } from "next/server";
import { redirect } from "next/navigation";

import { loginAdminAction } from "@/admin/actions/admin-actions";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-fg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(8,120,209,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,154,25,0.12),transparent_26%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <section className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-gold)] bg-[var(--surface-2)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
              <ShieldCheck className="h-4 w-4" />
              Admin Website
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.03em] text-fg">
                Separate login workspace for managing the full resource website.
              </h1>
              <p className="max-w-2xl text-base md:text-lg font-normal leading-relaxed text-fg-muted">
                Sign in to edit interns, team members, portfolio projects, jobs, blog posts, and site-wide copy. Image uploads are base64 encoded and compressed automatically when files are too large.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "MongoDB-backed dynamic content",
                "Separate admin routes and protected session",
                "Base64 image storage with auto compression",
                "Publish and unpublish content easily",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-line bg-[var(--surface)] px-5 py-4 text-sm md:text-base font-normal leading-relaxed text-fg-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-line bg-[var(--surface)] p-6 shadow-[0_30px_120px_-70px_rgba(8,120,209,0.55)] sm:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-ink">Protected Access</p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.03em] text-fg">Admin login</h2>
              </div>

              {params.error ? (
                <div className="rounded-[22px] border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-50">
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

                <button
                  type="submit"
                  className="btn-brand w-full"
                >
                  Sign in to dashboard
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <Link href="/resources" className="inline-flex items-center gap-2 text-sm md:text-base font-medium leading-snug text-tech transition hover:text-gold">
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
