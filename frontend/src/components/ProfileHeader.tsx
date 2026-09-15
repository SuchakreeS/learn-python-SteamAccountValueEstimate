import { useAuthStore } from "../store/useAuthStore";

export default function ProfileHeader() {
    const { steamName, avatarUrl } = useAuthStore()

    return (
        <div className="flex items-center gap-4">
            <img src={avatarUrl} alt="Steam avatar"
                className="h-24 w-24 rounded-full border-4 border-border object-cover" />
            <div className="rounded-full border-4 border-border bg-card px-8 py-4">
                <span className="font-body text-xl font-bold text-text-primary">
                    {steamName}
                </span>
            </div>
        </div>

    )
}
