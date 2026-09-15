import { BarChart2, Home, User } from "lucide-react";
import { useState } from "react";

type Tab = "home" | "chart" | "profile";

const tabs : { "id": Tab, label: string, Icon: typeof Home }[] = [
    { id: "home", label: "Home", Icon: Home },
    { id: "chart", label: "Chart", Icon: BarChart2 },
    { id: "profile", label: "Profile", Icon: User },
]

export default function BottomNav() {
    const [activeTab, setActiveTab] = useState<Tab>('home')

    return (
        <nav
            className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-8 rounded-full border-4 border-border bg-border px-10 py-4"
            style={{ boxShadow: "6px 6px 0 var(--color-highlight)" }}
        >
            {tabs.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        aria-label={label}
                        className="flex flex-col items-center gap-1"
                    >
                        <Icon
                            size={28}
                            strokeWidth={2.5}
                            color={isActive ? "var(--color-accent)" : "var(--color-bg)"}
                        />
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent2" />}
                    </button>
                );
            })}
        </nav>
    )
}