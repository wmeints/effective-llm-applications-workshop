import clsx from "clsx"
import MarkdownRenderer from "./markdown-renderer"
import { ChatMessage } from "@/lib/types"
import { useEffect, useRef } from "react"

interface ConversationMessagesProps {
    messages: ChatMessage[]
}

export default function ConversationMessages({
    messages,
}: ConversationMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const lastMessageContent = messages[messages.length - 1]?.content

    // Use an effect that triggers when the messages change or the content of the last
    // message changes. This hack makes sure we have the content in view.
    useEffect(() => {
        scrollToBottom()
    }, [messages.length, lastMessageContent])

    return (
        <div className="flex flex-1 flex-col h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto w-5xl">
                {messages.map((message) => (
                    <div key={message.messageId} className="mb-6">
                        <div
                            className={clsx("p-4 rounded-lg", {
                                "bg-gray-100 ml-12": message.author === "User",
                                "bg-white": message.author === "Assistant",
                            })}
                        >
                            <MarkdownRenderer content={message.content} />
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}
