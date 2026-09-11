import requests

STEAM_OPENID_URL = "https://steamcommunity.com/openid/login"

def get_login_url(return_to: str) -> str:
    params = {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": return_to,
        "openid.realm": return_to,
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    }
    query_string = "&".join(f"{key}={value}" for key, value in params.items())
    return f"{STEAM_OPENID_URL}?{query_string}"

def verify_login(args: dict) -> str | None :
    params = dict(args)
    params["openid.mode"] = "check_authentication"

    res = requests.post(STEAM_OPENID_URL, data= params)

    if "is_valid:true" in res.text:
        claimed_id = params.get("openid.claimed_id", "")
        steamid = claimed_id.rsplit('/', 1)[-1]
        return steamid

    return None