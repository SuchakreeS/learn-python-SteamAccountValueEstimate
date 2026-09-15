import ConfettiBg from "../components/ConfettiBg";
import ProfileHeader from "../components/ProfileHeader";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg px-6 pb-32 pt-10">
            <ConfettiBg />
            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col">
                <ProfileHeader />
                <div className="flex flex-1 flex-col items-center justify-center">
                    <StatCard />
                </div>
                <Footer />
            </div>
            <BottomNav />
        </div>
    );
}