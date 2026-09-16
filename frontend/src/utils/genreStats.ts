import type { GameGenre } from "../types/genre";

export interface GenreCount {
    name: string;
    count: number
}

function countByField(games: GameGenre[],field: "genres" | "categories"): GenreCount[] {
    const counts: Record<string, number> = {}

    for(const game of games) {
        for (const tag of game[field]) {
            counts[tag] = (counts[tag] ?? 0) + 1
        }
    }
    return Object.entries(counts).map(([name, count]) => ({name, count}))
    .sort((a, b)  => b.count - a.count)
}

export function countGenres(games: GameGenre[]): GenreCount[] {
    return countByField(games, "genres")
}

export function countCategories(games: GameGenre[]): GenreCount[] {
    return countByField(games, "categories")
}
