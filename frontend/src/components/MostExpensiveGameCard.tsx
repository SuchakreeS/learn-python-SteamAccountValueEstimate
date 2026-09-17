import type { Game } from "../types/game"

type MostExpensiveGameCardProps = {
    game: Game
}

export default function MostExpensiveGameCard({game}: MostExpensiveGameCardProps) {
    const headerUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appId}/header.jpg`

    return (
        <div
            className="w-full max-w-sm shrink-0 overflow-hidden rounded-3xl border-4 border-border bg-card"
            style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
        >
            <img src={headerUrl} alt={game.name} className="w-full border-b-4 border-border" />
            <div className="p-4 text-center">
                <p className="font-body text-lg font-bold text-text-primary">{game.name}</p>
                <p
                    className="mt-1 font-display text-xl text-accent"
                    style={{
                        WebkitTextStroke: "1px var(--color-accent3)",
                        textShadow: "2px 2px 0 rgba(26, 26, 26, 0.8)",
                    }}
                >
                    ${game.max?.toFixed(2)}
                </p>
                <p className="font-body text-sm text-text-primary">Your Most Expensive Game</p>
            </div>
        </div>
    )
}

