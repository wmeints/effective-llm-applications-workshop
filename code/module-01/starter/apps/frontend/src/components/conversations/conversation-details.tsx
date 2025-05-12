"use client"

import { useChat } from "@/hooks/use-chat"
import { getServiceUrl } from "@/lib/servicelocator"
import { ConversationInputForm } from "../app/conversation-input-form"
import { useEffect } from "react"
import { ChatMessage } from "@/lib/types"
import ConversationMessages from "./conversation-messages"
import { useAppStore } from "@/providers/app-store-provider"

interface ConversationProps {
    threadId: string
    messages: ChatMessage[]
}

export default function ConversationDetails({
    threadId,
    messages: initialMessages,
}: ConversationProps) {
    const { submitPrompt, messages } = useChat({
        baseUrl: `${getServiceUrl("chatservice")}/completions`,
        threadId: threadId as string,
        messages: initialMessages,
    })

    const pendingPrompt = useAppStore((x) => x.pendingPrompt)
    const setPendingPrompt = useAppStore((x) => x.setPendingPrompt)

    useEffect(() => {
        if (pendingPrompt) {
            setPendingPrompt(undefined)
            submitPrompt(pendingPrompt)
        }
    }, [pendingPrompt, setPendingPrompt, submitPrompt])

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <ConversationMessages messages={messages} />
            <ConversationInputForm onSubmit={submitPrompt} />
        </div>
    )
}
