import { useAuthStore } from "../store/useAuthStore";
import { useGamesStore } from "../store/useGamesStore";
import { getMostExpensiveGame } from "../utils/mostExpensiveGame";
import ConfettiBg from "../components/ConfettiBg";
import ProfileCard from "../components/ProfileCard";
import GameCountBox from "../components/GameCountBox";
import MostExpensiveGameCard from "../components/MostExpensiveGameCard";
import LogoutButton from "../components/LogoutButton";
import BottomNav from "../components/BottomNav";

export default function Profile() {
    const { avatarUrl, steamName, steamId } = useAuthStore();
    const { games, gameCount } = useGamesStore();
    const mostExpensive = getMostExpensiveGame(games);

    return (
        <div className="relative h-dvh overflow-y-auto bg-bg px-6 pb-36 pt-10">
            <ConfettiBg />
            <div className="absolute right-6 top-6 z-20">
                <LogoutButton />
            </div>
            <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col items-center justify-around">
                <ProfileCard avatarUrl={avatarUrl} steamName={steamName} steamId={steamId} />
                <GameCountBox count={gameCount} />
                {mostExpensive && <MostExpensiveGameCard game={mostExpensive} />}
            </div>
            <BottomNav />
        </div>
    );
}