import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import StartConversation from "./start-conversation"

// Mock next/navigation
const push = vi.fn()
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push }),
}))

// Mock generateId
vi.mock("@/lib/generate-id", () => ({
    generateId: () => "test-id",
}))

// Mock app store
const setPendingPrompt = vi.fn()
vi.mock("@/providers/app-store-provider", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useAppStore: (selector: any) => selector({ setPendingPrompt }),
}))

describe("StartConversation", () => {
    it("should match snapshot", () => {
        const { container } = render(<StartConversation />)
        expect(container).toMatchSnapshot()
    })
})
