from db import get_cached_genre, save_genre
from genre_api import get_game_genre_category
import time

def get_genres_for_lib(games: list[dict]) -> list[dict]:
    res = []

    for game in games:
        appid = game["appid"]
        cached = get_cached_genre(appid)

        if cached is not None:
            res.append({"appid": appid, **cached})
            continue

        data = get_game_genre_category(appid)
        if data is None:
            continue

        save_genre(appid, data["genres"], data["categories"])
        res.append({"appid": appid, **data})

        time.sleep(1)

    return res