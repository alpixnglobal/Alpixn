import { LogOut } from "lucide-react";

import { logoutAdminAction } from "@/admin/actions/admin-actions";

export function LogoutForm() {
  return (
    <form action={logoutAdminAction}>
      <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white">
        <LogOut className="h-4 w-4 text-white/45" />
        Log out
      </button>
    </form>
  );
}
