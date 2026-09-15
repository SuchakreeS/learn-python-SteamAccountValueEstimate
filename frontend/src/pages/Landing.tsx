import ConfettiBg from "../components/ConfettiBg";
import Headline from "../components/Headline";
import LoginButton from "../components/LoginButton";

export default function Landing() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-6">
            <ConfettiBg />
            <div className="relative z-10 flex flex-col items-center gap-10 text-center">
                <Headline />
                <p className="font-body text-lg font-bold text-text-primary">
                    Find out what your Steam library is really worth.
                </p>
                <LoginButton />
            </div>
        </section>
    )
}