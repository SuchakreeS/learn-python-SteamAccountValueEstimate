from flask import Flask, redirect, request, session
from steam_auth import get_login_url, verify_login
from steam_api import get_steam_name, get_profile_pic
from genre_library import get_genres_for_lib
from dotenv import load_dotenv
# from itad_api import lookup_itad_ids, get_prices, parse_price
from library import build_library
from db import init_db
import os
from flask_cors import CORS


load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]
IS_PRODUCTION = os.environ.get("RENDER") == "true"

app.config.update(
    SESSION_COOKIE_SAMESITE="None" if IS_PRODUCTION else "Lax",
    SESSION_COOKIE_SECURE=IS_PRODUCTION
)

FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:5000")

CORS(app, supports_credentials=True, origins=[FRONTEND_URL])

init_db()

@app.route('/api/health')
def health():
    return {'status' : 'Ok'}

@app.route('/login')
def login():
    return_to = f"{BACKEND_URL}/callback"
    return redirect(get_login_url(return_to))

@app.route('/callback')
def callback():
    steamid = verify_login(request.args)

    if steamid is None:
        return {"error" : "login verification failed"}, 401

    session["steamid"] = steamid
    return redirect(FRONTEND_URL)

@app.route('/api/me')
def me():
    steamid = session.get("steamid")

    if steamid is None:
        return {"logged_in": False}, 401

    steam_key = os.environ["STEAM_WEB_API_KEY"]
    steam_name = get_steam_name(steamid, steam_key)
    avatar_url = get_profile_pic(steamid, steam_key)

    return {
        "logged_in": True,
        "steamid": steamid,
        "steam_name": steam_name,
        "avatar_url": avatar_url
    }

@app.route('/api/games')
def games():
    steamid = session.get("steamid")

    if steamid is None:
        return {"error": "not logged in"}, 401

    steam_key = os.environ["STEAM_WEB_API_KEY"]
    itad_key = os.environ["ITAD_API_KEY"]

    library = build_library(steamid, steam_key, itad_key)

    if library is None:
        return{"error": "game details are private"}, 403

    return {"game_count": len(library), "games": library}

@app.route('/api/genres')
def genres():
    steamid = session.get("steamid")

    if steamid is None:
        return {"error": "not logged in"}, 401

    steam_key = os.environ["STEAM_WEB_API_KEY"]
    itad_key = os.environ["ITAD_API_KEY"]

    lib = build_library(steamid, steam_key, itad_key)

    if lib is None:
        return {"error": "Game details are private"}, 403

    genre_data = get_genres_for_lib(lib)

    return {"genres": genre_data}

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return{"logged_out": True}



# Test Route
# @app.route('/api/test-itad')
# def test_itad():
#     api_key = os.environ["ITAD_API_KEY"]
#     res = lookup_itad_ids([440, 570], api_key)
#     return res

# @app.route('/api/test-prices')
# def test_prices():
#     api_key = os.environ['ITAD_API_KEY']
#     itad_ids = ["018d937e-fde4-72ff-a7af-45e4955a8dd6", "018d937f-19a5-7057-bb6d-314d586e6dbc"]
#     raw_prices = get_prices(itad_ids, api_key)
#     parsed = [parse_price(entry) for entry in raw_prices]
#     return {"parsed": parsed}

# @app.route('/api/test-library')
# def test_library():
#     steamid = session.get("steamid")
#     steam_key = os.environ["STEAM_WEB_API_KEY"]
#     itad_key = os.environ["ITAD_API_KEY"]

#     library = build_library(steamid, steam_key, itad_key)

#     return {"GameCount": len(library), "Sample": library[:5]}

if __name__ == "__main__":
    app.run(debug=True, port = 5000)