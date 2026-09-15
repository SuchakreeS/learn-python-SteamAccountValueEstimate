export interface GameDto {
    appid : number;
    name : string;
    min : number | null;
    max : number | null;
}

export interface GameResponse {
    game_count : number;
    games : GameDto[]
}

export interface MeDto {
    logged_in : boolean;
    steamid? : string;
    steam_name? : string;
    avatar_url? : string;
}