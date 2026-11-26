import { LogOut } from "lucide-react";

import { logoutAdminAction } from "@/admin/actions/admin-actions";

export function LogoutForm() {
  return (
    <form action={logoutAdminAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/5 dark:bg-black/5 dark:bg-white/6 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-black/5 dark:bg-black/5 dark:bg-white/10"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </form>
  );
}
