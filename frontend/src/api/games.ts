import type { GameResponse } from "../types/dto"
import type { GamesSummary } from "../types/game"
import { apiClient } from "./client"
import { mapGameResponse } from "./mappers"

export async function getGames(): Promise<GamesSummary> {
    const res = await apiClient.get<GameResponse>("/api/games")
    return mapGameResponse(res.data)
}