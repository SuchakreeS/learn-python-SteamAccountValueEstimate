type ViewToggleProps = {
    view: "genres" | "categories"
    onChange: (view: "genres" | "categories") => void
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
    return (
        <div className="flex justify-center gap-4">
            <button
                onClick={() => onChange("genres")}
                className="rounded-full border-4 border-border px-6 py-2 font-body font-bold"
                style={{
                    backgroundColor: view === "genres" ? "var(--color-accent)" : "var(--color-card)",
                    color: view === "genres" ? "var(--color-accent2)" : "var(--color-text-primary)",
                }}
            >
                Genres
            </button>
            <button
                onClick={() => onChange("categories")}
                className="rounded-full border-4 border-border px-6 py-2 font-body font-bold"
                style={{
                    backgroundColor: view === "categories" ? "var(--color-accent)" : "var(--color-card)",
                    color: view === "categories" ? "var(--color-accent2)" : "var(--color-text-primary)",
                }}
            >
                Categories
            </button>
        </div>
    )
}