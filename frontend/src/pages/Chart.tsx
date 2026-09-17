// pages/Chart.tsx
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import { getGenres } from "../api/genres";
import { countGenres, countCategories } from "../utils/genreStats";
import type { GameGenre } from "../types/genre";
import BottomNav from "../components/BottomNav";
import Loading from "../components/Loading";
import ViewToggle from "../components/ViewToggle";
import TopGenreCard from "../components/TopGenreCard";

const BAR_COLORS = ["var(--color-accent)", "var(--color-accent3)", "var(--color-accent2)"];

export default function Chart() {
    const [games, setGames] = useState<GameGenre[] | null>(null);
    const [view, setView] = useState<"genres" | "categories">("genres");

    useEffect(() => {
        getGenres().then(setGames);
    }, []);

    if (games === null) {
        return <Loading message="Analyzing your library..." />;
    }

    const data = view === "genres" ? countGenres(games) : countCategories(games);
    const topGenre = countGenres(games)[0]

    return (
        <div className="min-h-screen bg-bg px-6 pb-32 pt-10">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                <TopGenreCard name={topGenre.name} count={topGenre.count} />
                <ViewToggle view={view} onChange={setView} />

                <div
                    className="rounded-3xl border-4 border-border bg-card p-6"
                    style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
                >
                    <ResponsiveContainer width="100%" height={data.length * 40 + 40}>
                        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={140}
                                tick={{ fontFamily: "var(--font-body)", fontWeight: 700, fill: "var(--color-text-primary)" }}
                                axisLine={{ stroke: "var(--color-border)", strokeWidth: 2 }}
                                tickLine={false}
                            />
                            <Bar dataKey="count" radius={[0, 8, 8, 0]} animationDuration={800} animationEasing="ease-out">
                                {data.map((_, index) => (
                                    <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} stroke="var(--color-border)" strokeWidth={2} />
                                ))}
                                <LabelList
                                    dataKey="count"
                                    position="right"
                                    style={{ fontFamily: "var(--font-body)", fontWeight: 700, fill: "var(--color-text-primary)" }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <BottomNav />
        </div>
    );
}