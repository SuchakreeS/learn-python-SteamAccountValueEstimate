export interface Game {
    appId : number;
    name : string;
    min : number | null;
    max : number | null;
}

export interface GamesSummary {
    gameCount : number;
    games : Game[]
}