interface TopGenreCardProps {
    name: string;
    count: number
}


export default function TopGenreCard({ name, count }: TopGenreCardProps) {
    return (
        <div
            className="rounded-3xl border-4 border-border bg-card px-6 py-5 text-center"
            style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
        >
            <p className="font-body text-lg font-bold text-text-primary">
                Your top genre is
            </p>
            <p className="mt-1">
                <span
                    className="font-display text-3xl text-accent"
                    style={{
                        WebkitTextStroke: "1px var(--color-accent3)",
                        textShadow: "2px 2px 0 rgba(26, 26, 26, 0.8)",
                    }}
                >
                    {name}
                </span>
            </p>
            <p className="mt-1 font-body text-sm font-bold text-text-secondary">
                {count} games
            </p>
        </div>
    );
}