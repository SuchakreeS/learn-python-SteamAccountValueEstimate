import { BarChart2, Home, User } from "lucide-react";
import { NavLink } from "react-router";

const tabs = [
    { path: "/", label: "Home", Icon: Home },
    { path: "/chart", label: "Chart", Icon: BarChart2 },
    { path: "/profile", label: "Profile", Icon: User },
]

export default function BottomNav() {
    return (
        <nav
            className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-8 rounded-full border-4 border-border bg-border px-10 py-4"
            style={{ boxShadow: "6px 6px 0 var(--color-highlight)" }}
        >
            {tabs.map(({ path, label, Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === "/"}
                    aria-label={label}
                    className="flex flex-col items-center gap-1"
                >
                    {({ isActive }) => (
                        <>
                            <Icon
                                size={28}
                                strokeWidth={2.5}
                                color={isActive ? "var(--color-accent)" : "var(--color-bg)"}
                            />
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent2" />}
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    )
}