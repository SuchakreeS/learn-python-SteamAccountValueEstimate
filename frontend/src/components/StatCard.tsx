import { useGamesStore } from "../store/useGamesStore"
import { priceTotals } from "../utils/priceTotals"

export default function StatCard() {
    const { games, gameCount } = useGamesStore()
    const { totalMin, totalMax } = priceTotals(games)

    return (
        <div
            className="rounded-3xl border-4 border-border bg-card px-10 py-12 text-center"
            style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
        >
            <p className="font-body text-xl font-bold text-text-primary">
                You currently have{" "}
                <span
                    className="font-display text-accent"
                    style={{
                        WebkitTextStroke: "1.5px var(--color-accent3)",
                        textShadow: "3px 3px 0 rgba(26, 26, 26, 0.8)",
                    }}
                >
                    {gameCount}
                </span>{" "}
                Games
            </p>

            <p className="mt-8 font-body text-xl font-bold text-text-primary">
                Your Estimate Value is
            </p>

            <p className="mt-4">
                <span
                    className="font-display text-2xl text-accent"
                    style={{
                        WebkitTextStroke: "1.5px var(--color-accent3)",
                        textShadow: "3px 3px 0 rgba(26, 26, 26, 0.8)",
                    }}
                >
                    ${totalMin.toFixed(2)} - ${totalMax.toFixed(2)}
                </span>{" "}
                <span className="font-body text-lg font-bold text-text-primary">
                    USD
                </span>
            </p>
        </div>
    )
}