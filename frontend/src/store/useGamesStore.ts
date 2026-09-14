import { create } from "zustand";
import { getGames } from "../api/games";
import type { Game } from "../types/game";

interface GamesState{
    games: Game[];
    gameCount: number;
    loading: boolean;
    error: string | null;
    fetchGames: () => Promise<void>
}

export const useGamesStore = create<GamesState>()((set) => ({
    games: [],
    gameCount: 0,
    loading: false,
    error: null,
    fetchGames: async () => {
        set({
            loading: true,
            error: null
        })
            try{
                const summary = await getGames()
                set({
                    games: summary.games, gameCount: summary.gameCount, loading: false
                })
            } catch(err) {
                set({
                    error: "Failed to load game", loading: false
                })
            }
    }
}))