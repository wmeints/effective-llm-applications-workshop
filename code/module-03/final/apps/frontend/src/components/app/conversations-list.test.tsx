import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import ConversationsList from "./conversations-list"
import { Conversation } from "@/lib/types"
import { SidebarProvider } from "@/components/ui/sidebar"

// Mock useIsMobile hook
vi.mock("@/hooks/use-mobile", () => ({
    useIsMobile: () => false
}))

describe("ConversationsList", () => {
    const mockConversations: Conversation[] = [
        {
            id: 1,
            threadId: "thread-1",
            dateCreated: new Date("2025-04-14T14:35:09Z"),
            dateModified: new Date("2025-04-14T14:40:09Z"),
        },
        {
            id: 2,
            threadId: "thread-2",
            dateCreated: new Date("2025-04-14T13:35:09Z"),
            dateModified: undefined,
        },
    ]

    it("should match snapshot", () => {
        const { container } = render(
            <SidebarProvider>
                <ConversationsList conversations={mockConversations} />
            </SidebarProvider>
        )
        expect(container).toMatchSnapshot()
    })
})
