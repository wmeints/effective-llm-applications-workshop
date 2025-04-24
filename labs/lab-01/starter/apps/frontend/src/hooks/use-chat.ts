import { callChatApiEndpoint } from "@/lib/chat/call-chat-api"
import { DataStreamDecoderCallbacks } from "@/lib/chat/decode-stream"
import { generateId } from "@/lib/generate-id"
import { throttle } from "@/lib/throttle"
import { ChatMessage } from "@/lib/types"
import { useAppStore } from "@/providers/app-store-provider"
import { useCallback, useEffect, useRef } from "react"
import useSWR from "swr"

interface UseChatOptions {
    threadId: string
    baseUrl: string
    messages?: ChatMessage[]
}
interface ChatMessageDeltaEventPayload {
    content: string
}

export function useChat(options: UseChatOptions) {
    const fetchRecentConversations = useAppStore(
        (x) => x.fetchRecentConversations
    )

    const { data: status = "ready", mutate: mutateStatus } = useSWR<string>(
        [options.threadId, "status"],
        null
    )

    const { data: messages, mutate } = useSWR<ChatMessage[]>(
        [options.threadId, "messages"],
        null,
        { fallbackData: options.messages || [] }
    )

    const messagesRef = useRef<ChatMessage[]>(messages || [])

    useEffect(() => {
        messagesRef.current = messages || []
    }, [messages])

    const submitPrompt = useCallback(
        async (prompt: string) => {
            const throttledMutate = throttle(mutate, undefined)

            if (status === "submitted" || status === "streaming") {
                return
            }

            mutateStatus("submitted")

            const messages = messagesRef.current

            // Use an optimistic update for the user interface.
            // We'll fix it in post if the application fails to talk to the server.

            messages.push({
                messageId: generateId(),
                author: "User",
                content: prompt,
                timestamp: new Date(),
            })

            messages.push({
                messageId: generateId(),
                author: "Assistant",
                content: "",
                timestamp: new Date(),
            })

            throttledMutate(messages, false)

            const callbacks: DataStreamDecoderCallbacks = {
                onEvent: (e) => {
                    if (status !== "streaming") {
                        mutateStatus("streaming")
                    }

                    if (e.type === "delta") {
                        const messageData =
                            e.data as ChatMessageDeltaEventPayload
                        const lastMessage = messages[messages.length - 1]
                        lastMessage.content += messageData.content
                    }

                    throttledMutate(messages, false)
                },
            }

            await callChatApiEndpoint({
                baseUrl: options.baseUrl,
                threadId: options.threadId,
                prompt,
                callbacks,
            })

            await fetchRecentConversations()

            throttledMutate(messages, false)
            mutateStatus("ready")
        },
        [
            mutate,
            status,
            mutateStatus,
            options.threadId,
            options.baseUrl,
            fetchRecentConversations,
        ]
    )

    return {
        messages: messages ?? [],
        status,
        submitPrompt,
    }
}
