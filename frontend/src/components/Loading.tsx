// components/Loading.tsx
type LoadingProps = {
    message?: string;
};

export default function Loading({ message = "Loading..." }: LoadingProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6">
            <div
                className="flex items-center gap-3 rounded-full border-4 border-border bg-card px-8 py-5"
                style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
            >
                <span className="h-4 w-4 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                <span className="h-4 w-4 animate-bounce rounded-full bg-accent3 [animation-delay:-0.15s]" />
                <span className="h-4 w-4 animate-bounce rounded-full bg-highlight" />
            </div>
            <p className="font-body text-lg font-bold text-text-primary">{message}</p>
        </div>
    );
}