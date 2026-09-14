import type { Game } from "../types/game";

export interface PriceTotals {
    totalMin : number;
    totalMax : number
}

export function priceTotals(games: Game[]): PriceTotals{
    return games.reduce(
        (totals, game) => ({
            totalMin: totals.totalMin + (game.min ?? 0),
            totalMax: totals.totalMax + (game.max ?? 0)
        }),
        {totalMin: 0, totalMax:0}
    )
}