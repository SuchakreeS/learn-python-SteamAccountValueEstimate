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

def _get_player_summary(steamid, api_key):
    url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/"
    params = {
        "key" : api_key,
        "steamids" : steamid
    }
    res = requests.get(url, params=params)
    data = res.json()
    players = data.get("response", {}).get("players", [])

    if not players:
        return None

    return players[0]

def get_steam_name(steamid, api_key):
    player = _get_player_summary(steamid, api_key)
    if player is None:
        return None
    return player.get("personaname")

def get_profile_pic(steamid, apikey):
    player = _get_player_summary(steamid, apikey)
    if player is None:
        return None
    return player.get("avatarfull")

