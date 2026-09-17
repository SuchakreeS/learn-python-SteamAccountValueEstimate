import os
import psycopg2
import psycopg2.extras
import json
from datetime import datetime, timedelta, timezone

CACHE_MAX_AGE_HOURS = 24

def get_connection():
    conn = psycopg2.connect(os.environ["DATABASE_URL"], cursor_factory=psycopg2.extras.RealDictCursor)
    return conn


def init_db():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS cached_games(
        steamid TEXT NOT NULL,
        appid INTEGER NOT NULL,
        name TEXT,
        min_price REAL,
        max_price REAL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY(steamid,appid))
""")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS game_genres(
    appid INTEGER PRIMARY KEY,
    genres TEXT,
    categories TEXT)
""")
    conn.commit()
    cur.close()
    conn.close()

def get_cached_library(steamid: str) -> list[dict] | None:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM cached_games WHERE steamid = %s", (steamid,)
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    if not rows:
        return None

    updated_at = datetime.fromisoformat(rows[0]["updated_at"])
    age = datetime.now(timezone.utc) - updated_at

    if age > timedelta(hours=CACHE_MAX_AGE_HOURS):
        return None

    return [
        {"appid": row["appid"], "name": row["name"], "min": row["min_price"],"max": row["max_price"]  }
        for row in rows
    ]

def save_library(steamid: str, games: list[dict]):
    conn = get_connection()
    cur = conn.cursor()
    now = datetime.now(timezone.utc).isoformat()

    for game in games:
        cur.execute("""
            INSERT INTO cached_games(steamid, appid, name, min_price, max_price, updated_at)
            VALUES (%s,%s,%s,%s,%s,%s)
            ON CONFLICT (steamid, appid) DO UPDATE SET
                name = excluded.name,
                min_price = excluded.min_price,
                max_price = excluded.max_price,
                updated_at = excluded.updated_at
        """,(steamid, game["appid"], game["name"], game["min"], game["max"], now))

    conn.commit()
    cur.close()
    conn.close()

def save_genre(appid: int, genres: list[str], categories: list[str]) :
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO game_genres(appid, genres, categories)
    VALUES (%s,%s,%s)
    ON CONFLICT (appid) DO UPDATE SET
        genres = excluded.genres,
        categories = excluded.categories
    """, (appid, json.dumps(genres), json.dumps(categories)))

    conn.commit()
    cur.close()
    conn.close()

def get_cached_genres(appids: list[int]) -> dict[int, dict]:
    if not appids:
        return {}

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM game_genres WHERE appid = ANY(%s)", (appids,)
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return{
        row["appid"]: {
            "genres": json.loads(row["genres"]),
            "categories": json.loads(row["categories"])
        }
        for row in rows
    }