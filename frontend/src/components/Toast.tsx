// components/Toast.tsx
type ToastProps = {
    message: string;
};

export default function Toast({ message }: ToastProps) {
    return (
        <div
            className="relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border-4 border-border bg-accent2 px-6 py-4"
        >
            {/* top-left decorative corner block */}
            <div
                className="absolute left-0 top-0 h-8 w-16"
                style={{
                    backgroundColor: "var(--color-accent)",
                    boxShadow:
                        "3px 3px 0 var(--color-accent3), 6px 6px 0 var(--color-highlight)",
                }}
            />

            {/* bottom-right decorative corner block (mirrored, smaller) */}
            <div
                className="absolute bottom-0 right-0 h-6 w-12"
                style={{
                    backgroundColor: "var(--color-accent)",
                    boxShadow:
                        "-3px -3px 0 var(--color-accent3), -6px -6px 0 var(--color-highlight)",
                }}
            />

            {/* confetti dots */}
            <span className="absolute right-4 top-3 h-2 w-2 rounded-full bg-bg" />
            <span className="absolute bottom-3 left-6 h-1.5 w-1.5 rounded-full bg-bg" />

            {/* icon slot — empty for now, real icons come later */}
            <div className="relative z-10 h-10 w-10 flex-shrink-0 rounded-full border-2 border-border bg-white" />

            <p className="relative z-10 font-body text-lg font-bold text-border">
                {message}
            </p>
        </div>
    );
}