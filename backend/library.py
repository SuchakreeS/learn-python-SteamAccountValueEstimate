from steam_api import get_owned_games
from itad_api import lookup_itad_ids, get_prices, parse_price

def build_library(steamid: str, steam_key: str, itad_key: str) -> list[dict]:
    games = get_owned_games(steamid, steam_key)

    if games is None:
        return None

    appids = [game["appid"] for game in games]
    id_mapping = lookup_itad_ids(appids, itad_key)

    itad_ids = [itad_id for itad_id in id_mapping.values() if itad_id is not None]
    raw_prices = get_prices(itad_ids, itad_key)
    price_lookup = {entry["id"]: parse_price(entry) for entry in raw_prices}
    res = []
    for game in games:
        itad_id = id_mapping.get(f"app/{game['appid']}")
        price = price_lookup.get(itad_id)

        res.append({
            "appid": game["appid"],
            "name": game["name"],
            "min": price["min"] if price else None,
            "max": price["max"] if price else None
        })

    return res