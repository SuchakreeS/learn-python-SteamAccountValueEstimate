type ProfileCardProps = {
    avatarUrl?: string | undefined;
    steamName: string | undefined;
    steamId: string | undefined
}

export default function ProfileCard({avatarUrl, steamName, steamId}: ProfileCardProps){
    return(
        <div className="flex flex-col items-center gap-2">
            <img
                src={avatarUrl}
                alt="Steam avatar"
                className="h-32 w-32 rounded-full border-4 border-border object-cover"
                style={{ boxShadow: "6px 6px 0 var(--color-accent2)" }}
            />
            <p className="font-body text-2xl font-bold text-text-primary">{steamName}</p>
            <p className="font-body text-sm text-text-primary" style={{ opacity: 0.6 }}>{steamId}</p>
        </div>
    )
}