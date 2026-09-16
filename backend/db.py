import sqlite3
import json
from datetime import datetime, timedelta, timezone

DB_PATH = "cache.db"

CACHE_MAX_AGE_HOURS = 24

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS cached_games(
        steamid TEXT NOT NULL,
        appid INTEGER NOT NULL,
        name TEXT,
        min_price REAL,
        max_price REAL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY(steamid,appid))
""")
    conn.execute("""
    CREATE TABLE IF NOT EXISTS game_genres(
    appid INTEGER PRIMARY KEY,
    genres TEXT,
    categories TEXT)
""")
    conn.commit()
    conn.close()

def get_cached_library(steamid: str) -> list[dict] | None:
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM cached_games WHERE steamid = ?", (steamid,)
    ).fetchall()
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
    now = datetime.now(timezone.utc).isoformat()

    for game in games:
        conn.execute("""
            INSERT INTO cached_games(steamid, appid, name, min_price, max_price, updated_at)
            VALUES (?,?,?,?,?,?)
            ON CONFLICT (steamid, appid) DO UPDATE SET
                name = excluded.name,
                min_price = excluded.min_price,
                max_price = excluded.max_price,
                updated_at = excluded.updated_at
        """,(steamid, game["appid"], game["name"], game["min"], game["max"], now))

    conn.commit()
    conn.close()

def get_cached_genre(appid : int) -> dict | None:
    conn = get_connection()
    row = conn.execute(
    "SELECT * FROM game_genres WHERE appid=?", (appid,)
    ).fetchone()
    conn.close()

    if row is None:
        return None

    return {
        "genres": json.loads(row["genres"]),
        "categories": json.loads(row["categories"])
    }


def save_genre(appid: int, genres: list[str], categories: list[str]) :
    conn = get_connection()
    conn.execute("""
    INSERT INTO game_genres(appid, genres, categories)
    VALUES (?,?,?)
    ON CONFLICT (appid) DO UPDATE SET
        genres = excluded.genres,
        categories = excluded.categories
    """, (appid, json.dumps(genres), json.dumps(categories)))

    conn.commit()
    conn.close()