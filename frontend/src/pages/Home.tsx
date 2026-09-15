import { useGamesStore } from "../store/useGamesStore";
import { priceTotals } from "../utils/priceTotals";

export default function Home() {
    const { games, gameCount } = useGamesStore();
    const { totalMin, totalMax } = priceTotals(games);

    return (
        <div>
            <h1>Your Library ({gameCount} games)</h1>
            <h2>Estimated Value: ${totalMin.toFixed(2)} - ${totalMax.toFixed(2)}</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.appId}>
                        {game.name} - min: {game.min ?? "N/A"}, max: {game.max ?? "N/A"}
                    </li>
                ))}
            </ul>
        </div>
    );
}