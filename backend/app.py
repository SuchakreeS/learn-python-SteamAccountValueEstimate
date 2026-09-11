from flask import Flask, redirect, request, session
from steam_auth import get_login_url, verify_login
from dotenv import load_dotenv
from steam_api import get_owned_games
from itad_api import lookup_itad_ids, get_prices, parse_price
from library import build_library
import os


load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]

@app.route('/api/health')
def health():
    return {'status' : 'Ok'}

@app.route('/login')
def login():
    return_to = "http://localhost:5000/callback"
    return redirect(get_login_url(return_to))

@app.route('/callback')
def callback():
    steamid = verify_login(request.args)

    if steamid is None:
        return {"error" : "login verification failed"}, 401

    session["steamid"] = steamid
    return {"logged_in":True, "steamid" : steamid}

@app.route('/api/me')
def me():
    steamid = session.get("steamid")

    if steamid is None:
        return {"logged in" : False}, 401

    return {"logged in" : True, "steamid" : steamid}

@app.route('/api/games')
def games():
    steamid = session.get("steamid")

    if steamid is None:
        return {"error": "not logged in"}, 401

    api_key = os.environ["STEAM_WEB_API_KEY"]
    games = get_owned_games(steamid, api_key)

    if games is None :
        return {"error" : "game details are private"}, 403

    return {
        "game_count": len(games), "games" : games
    }

@app.route('/api/test-itad')
def test_itad():
    api_key = os.environ["ITAD_API_KEY"]
    res = lookup_itad_ids([440, 570], api_key)
    return res

@app.route('/api/test-prices')
def test_prices():
    api_key = os.environ['ITAD_API_KEY']
    itad_ids = ["018d937e-fde4-72ff-a7af-45e4955a8dd6", "018d937f-19a5-7057-bb6d-314d586e6dbc"]
    raw_prices = get_prices(itad_ids, api_key)
    parsed = [parse_price(entry) for entry in raw_prices]
    return {"parsed": parsed}

@app.route('/api/test-library')
def test_library():
    steamid = session.get("steamid")
    steam_key = os.environ["STEAM_WEB_API_KEY"]
    itad_key = os.environ["ITAD_API_KEY"]

    library = build_library(steamid, steam_key, itad_key)

    return {"GameCount": len(library), "Sample": library[:5]}

if __name__ == "__main__":
    app.run(debug=True, port = 5000)