import ConfettiBg from "../components/ConfettiBg";
import ProfileHeader from "../components/ProfileHeader";
import StatCard from "../components/StatCard";
import BottomNav from "../components/BottomNav";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-bg px-6 pb-32 pt-10">
            <ConfettiBg />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-10">
                <ProfileHeader />
                <StatCard />
            </div>
            <BottomNav />
        </div>
    );
}