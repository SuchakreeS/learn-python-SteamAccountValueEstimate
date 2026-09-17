import type { Game } from "../types/game";

export function getMostExpensiveGame(games: Game[]): Game | null {
    return games.reduce<Game | null>((best, game) => {
        if (game.max === null) {
            return best
        }
        if (best === null || game.max > (best.max ?? -Infinity)) {
            return game
        }
        return best
    }, null)
}