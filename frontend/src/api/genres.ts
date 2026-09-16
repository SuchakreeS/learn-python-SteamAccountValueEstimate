import type { GenresResponseDto } from "../types/dto";
import type { GameGenre } from "../types/genre";
import {apiClient} from './client'

export async function getGenres(): Promise<GameGenre[]> {
    const res = await apiClient.get<GenresResponseDto>("/api/genres")
    return res.data.genres
}