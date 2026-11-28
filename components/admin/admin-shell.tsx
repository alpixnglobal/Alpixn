import { AdminShellView, type AdminShellProps } from "@/admin/admin/admin-ui";
import { getAdminSession } from "@/lib/admin-auth";

/**
 * Server wrapper for the admin layout: reads the signed-in user so the sidebar shows only the
 * sections their role may open, and pages they can't open render "No access" instead of content.
 * (Kept separate from admin-ui, which client components also import.)
 */
export async function AdminShell(props: Omit<AdminShellProps, "session">) {
  const session = await getAdminSession();
  return <AdminShellView {...props} session={session ? { email: session.email, name: session.name, role: session.role } : null} />;
}
