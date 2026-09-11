import requests

ITAD_API_BASE = "https://api.isthereanydeal.com"

def lookup_itad_ids(appids: list[int], api_key: str) -> dict:
    url = f"{ITAD_API_BASE}/lookup/id/shop/61/v1"
    params = {"key": api_key}
    body = [f"app/{appid}" for appid in appids]

    res = requests.post(url, params=params, json=body)
    return res.json()

def get_prices(itad_ids: list[str], api_key : str) -> list[dict]:
    url = f"{ITAD_API_BASE}/games/prices/v3"
    params = {"key": api_key}
    body = itad_ids

    res = requests.post(url, params=params, json=body)
    return res.json()

def parse_price(entry : dict) -> dict:
    itad_id = entry.get("id")

    history_low = entry.get("historyLow", {}).get('all')
    min_price = history_low["amount"] if history_low else None

    steam_deal = None
    for deal in entry.get("deals", []):
        if deal.get("shop", {}).get("name") == "Steam":
            steam_deal = deal
            break

    max_price = steam_deal["regular"]["amount"] if steam_deal else None

    return {"id": itad_id, "min":min_price, "max": max_price}