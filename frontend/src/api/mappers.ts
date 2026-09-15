import type { AuthStatus } from "../types/auth";
import type { GameDto, GameResponse, MeDto } from "../types/dto";
import type { Game, GamesSummary } from "../types/game";

export function mapGame(dto: GameDto): Game{
    return {
        appId: dto.appid,
        name: dto.name,
        min: dto.min,
        max: dto.max
    }
}

export function mapGameResponse(dto: GameResponse): GamesSummary{
    return {
        gameCount: dto.game_count,
        games: dto.games.map(mapGame)
    }
}

export function mapMe(dto: MeDto): AuthStatus{
    return{
        loggedIn : dto.logged_in,
        steamId : dto.steamid,
        steamName : dto.steam_name,
        avatarUrl : dto.avatar_url
    }
}