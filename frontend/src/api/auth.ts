import type { AuthStatus } from "../types/auth";
import type { MeDto } from "../types/dto";
import { API_BASE_URL, apiClient } from "./client";
import { mapMe } from "./mappers";


export async function getMe(): Promise<AuthStatus> {
    const res = await apiClient.get<MeDto>("/api/me")
    return mapMe(res.data)
}

export function login(): void {
    window.location.href = `${API_BASE_URL}/login`
}

export async function logout(): Promise <void> {
    await apiClient.post('/logout')
}