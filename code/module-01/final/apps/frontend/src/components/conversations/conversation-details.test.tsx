import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import ConversationDetails from "./conversation-details"
import { useChat } from "@/hooks/use-chat"
import { useAppStore } from "@/providers/app-store-provider"
import type { ChatMessage } from "@/lib/types"
import type { AppStore } from "@/stores/app"

// Mock the hooks
vi.mock("@/hooks/use-chat")
vi.mock("@/providers/app-store-provider")
vi.mock("@/lib/servicelocator", () => ({
    getServiceUrl: () => "http://test-url",
}))

describe("ConversationDetails", () => {
    const mockSubmitPrompt = vi.fn()
    const mockSetPendingPrompt = vi.fn()
    const mockMessages: ChatMessage[] = [
        { messageId: "1", author: "User", content: "Hello", timestamp: new Date() },
        { messageId: "2", author: "Assistant", content: "Hi there", timestamp: new Date() },
    ]

    beforeEach(() => {
        vi.clearAllMocks()

        // Mock scrollIntoView
        Element.prototype.scrollIntoView = vi.fn()
        
        // Mock useChat hook
        vi.mocked(useChat).mockReturnValue({
            messages: mockMessages,
            submitPrompt: mockSubmitPrompt,
            status: "idle",
        })

        // Mock useAppStore hook
        vi.mocked(useAppStore).mockImplementation((selector) => {
            const store: AppStore = {
                pendingPrompt: undefined,
                setPendingPrompt: mockSetPendingPrompt,
                recentConversations: [],
                reset: vi.fn(),
                fetchRecentConversations: vi.fn(),
            }
            return selector(store)
        })
    })

    it("renders conversation messages and input form", () => {
        render(
            <ConversationDetails 
                threadId="test-thread"
                messages={mockMessages}
            />
        )

        // Verify messages are rendered
        expect(screen.getByText("Hello")).toBeInTheDocument()
        expect(screen.getByText("Hi there")).toBeInTheDocument()
    })

    it("initializes useChat with correct parameters", () => {
        render(
            <ConversationDetails 
                threadId="test-thread"
                messages={mockMessages}
            />
        )

        expect(useChat).toHaveBeenCalledWith({
            baseUrl: "http://test-url/completions",
            threadId: "test-thread",
            messages: mockMessages,
        })
    })

    it("submits pending prompt and clears it", async () => {
        // Mock pending prompt
        vi.mocked(useAppStore).mockImplementation((selector) => {
            const store: AppStore = {
                pendingPrompt: "test prompt",
                setPendingPrompt: mockSetPendingPrompt,
                recentConversations: [],
                reset: vi.fn(),
                fetchRecentConversations: vi.fn(),
            }
            return selector(store)
        })

        render(
            <ConversationDetails 
                threadId="test-thread"
                messages={mockMessages}
            />
        )

        await waitFor(() => {
            expect(mockSubmitPrompt).toHaveBeenCalledWith("test prompt")
            expect(mockSetPendingPrompt).toHaveBeenCalledWith(undefined)
        })
    })
})
