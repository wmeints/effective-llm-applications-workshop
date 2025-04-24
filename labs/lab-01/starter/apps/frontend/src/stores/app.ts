import { createStore } from "zustand/vanilla"
import { getRecentConversations } from "@/lib/api"
import { Conversation } from "@/lib/types"

export type AppState = {
    recentConversations: Conversation[]
    pendingPrompt?: string
}

export type AppActions = {
    reset: () => void
    fetchRecentConversations: () => Promise<void>
    setPendingPrompt: (prompt?: string) => void
}

export type AppStore = AppState & AppActions

export const defaultInitState: AppState = {
    recentConversations: [],
    pendingPrompt: undefined,
}

export const createAppStore = (initState: AppState = defaultInitState) => {
    return createStore<AppStore>()((set) => ({
        ...initState,
        reset: () => set(defaultInitState),
        setPendingPrompt: (prompt?: string) => set({ pendingPrompt: prompt }),
        fetchRecentConversations: async () => {
            const response = await getRecentConversations()
            set({ recentConversations: response.items })
        },
    }))
}
