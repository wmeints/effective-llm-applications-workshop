"use client"

import { ConversationInputForm } from "./conversation-input-form"
import { useRouter } from "next/navigation"
import { generateId } from "@/lib/generate-id"
import { useAppStore } from "@/providers/app-store-provider"

export default function StartConversation() {
    const router = useRouter()
    const setPendingPrompt = useAppStore((x) => x.setPendingPrompt)

    async function handleSubmit(prompt: string) {
        setPendingPrompt(prompt)

        const threadId = generateId()
        router.push(`/conversations/${threadId}`)
    }

    return (
        <div className="w-5xl space-y-4">
            <h2 className="text-2xl font-semibold">
                How can I help you today?
            </h2>
            <ConversationInputForm onSubmit={handleSubmit} />
        </div>
    )
}
