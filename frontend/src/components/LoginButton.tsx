import { login } from "../api/auth";

export default function LoginButton() {
    return(
        <button onClick={login}
        className="rounded-full border-4 border-border  bg-accent px-10 py-4 font-body text-xl font-bold text-accent2">
            Log in with Steam
        </button>
    )
}