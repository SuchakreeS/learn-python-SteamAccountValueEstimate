import {create} from 'zustand'
import { getMe } from '../api/auth';

interface AuthState {
    loggedIn : boolean;
    steamId? : string;
    checking : boolean;
    checkAuth : () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    set => ({
        loggedIn: false,
        steamId: undefined,
        checking: true,
        checkAuth: async() => {
            const status = await getMe()
            set ({
                loggedIn: status.loggedIn,
                steamId: status.steamId,
                checking: false
            })
        }
    })
)