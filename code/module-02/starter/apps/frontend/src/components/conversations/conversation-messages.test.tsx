import { describe, it, vi, beforeEach, expect } from "vitest"
import { render } from "@testing-library/react"
import ConversationMessages from "./conversation-messages"
import { ChatMessage } from "@/lib/types"

describe("ConversationMessages", () => {
    beforeEach(() => {
        // Mock scrollIntoView
        Element.prototype.scrollIntoView = vi.fn()
    })
    it("renders correctly", () => {
        const messages: ChatMessage[] = [
            {
                messageId: "1",
                content: "Hello, how can I help you?",
                author: "Assistant",
                timestamp: new Date("2025-04-14T19:28:24+02:00"),
            },
            {
                messageId: "2",
                content: "I have a question about React",
                author: "User",
                timestamp: new Date("2025-04-14T19:28:30+02:00"),
            },
        ]

        const { container } = render(
            <ConversationMessages messages={messages} />
        )
        expect(container).toMatchSnapshot()
    })
})
