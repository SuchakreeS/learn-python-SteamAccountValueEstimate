import requests

def get_game_genre_category(appid):
    url = "https://store.steampowered.com/api/appdetails"
    params= {"appids" : appid}
    res = requests.get(url, params=params)
    data = res.json()

    if data is None:
        return None

    app_data = data.get(str(appid))
    if app_data is None or not app_data.get("success"):
        return None

    details = app_data["data"]
    genres = [g["description"] for g in details.get("genres", [])]
    categories = [c["description"] for c in details.get("categories", [])]

    return {"genres": genres, "categories": categories}