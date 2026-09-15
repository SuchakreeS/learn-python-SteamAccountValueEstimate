export default function Headline() {
    return (
        <h1 className="font-display text-5xl text-accent md:text-6xl"
            style={{
                WebkitTextStroke: "2px var(--color-accent3)",
                textShadow: "4px 4px 0 rgba(255, 59, 48, 0.6)",
            }}>
            Steam Value Estimator
        </h1>
    )
}