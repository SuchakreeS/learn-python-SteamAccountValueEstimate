import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function LogoutButton(){
    const logout = useAuthStore((state) => state.logout)

    return (
        <button onClick={logout} aria-label="Log out"
        className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-border bg-card">
            <LogOut size={20} strokeWidth={2.5} color="var(--color-border)"/>
        </button>
    )
}

