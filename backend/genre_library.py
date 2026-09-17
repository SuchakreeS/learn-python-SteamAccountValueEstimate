from db import get_cached_genres, save_genre
from genre_api import get_game_genre_category
import time

def get_genres_for_lib(games: list[dict]) -> list[dict]:
    appids = [game["appid"] for game in games]
    cached = get_cached_genres(appids)

    res = []
    for appid in appids:
        if appid in cached:
            res.append({"appid": appid, **cached[appid]})
            continue

        data = get_game_genre_category(appid)
        if data is None:
            continue

        save_genre(appid, data["genres"], data["categories"])
        res.append({"appid": appid, **data})

        time.sleep(1)

    return res