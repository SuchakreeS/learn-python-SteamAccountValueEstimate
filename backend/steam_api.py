import requests

STEAM_API_BASE = "https://api.steampowered.com"

def get_owned_games(steamid: str, api_key:str) -> list[dict] | None :
    url = f"{STEAM_API_BASE}/IPlayerService/GetOwnedGames/v1/"
    params = {
        "key": api_key,
        "steamid" : steamid,
        "include_appinfo": True,
        "format": "json",
    }

    res = requests.get(url, params=params)
    data = res.json()

    games = data.get("response", {}).get("games")
    return games