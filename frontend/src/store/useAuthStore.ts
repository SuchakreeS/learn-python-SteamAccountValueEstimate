import { create } from 'zustand'
import { getMe, logout } from '../api/auth';

interface AuthState {
    loggedIn: boolean;
    steamId?: string;
    steamName?: string;
    avatarUrl?: string;
    checking: boolean;
    checkAuth: () => Promise<void>
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    set => ({
        loggedIn: false,
        steamId: undefined,
        steamName: undefined,
        avatarUrl: undefined,
        checking: true,
        checkAuth: async () => {
            try {
                const status = await getMe()
                set({
                    loggedIn: status.loggedIn,
                    steamId: status.steamId,
                    steamName: status.steamName,
                    avatarUrl: status.avatarUrl,
                    checking: false
                })
            } catch {
                set({
                    loggedIn: false,
                    checking: false
                })
            }
        },
        logout: async () => {
            await logout()
            set({
                loggedIn: false,
                steamId: undefined,
                steamName: undefined,
                avatarUrl: undefined
            })
        }
    })
)