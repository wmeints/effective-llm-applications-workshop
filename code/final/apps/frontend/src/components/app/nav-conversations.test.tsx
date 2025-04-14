import { render } from "@testing-library/react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import NavConversations from "./nav-conversations"
import { useAppStore } from "@/providers/app-store-provider"
import { SidebarProvider } from "@/components/ui/sidebar"

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock the app store provider
vi.mock("@/providers/app-store-provider")

describe("NavConversations", () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(useAppStore as any).mockImplementation((selector: any) => {
            const store = {
                recentConversations: [
                    {
                        id: 1,
                        threadId: "1e8e108e-5a9b-4cbe-a4ee-f3e65431a3a1",
                        dateCreated: new Date("2025-04-14T00:00:00.000Z"),
                        dateModified: new Date("2025-04-14T00:00:00.000Z"),
                    },
                    {
                        id: 2,
                        threadId: "1e8e108e-5a9b-4cbe-a4ee-f3e65431a3a2",
                        dateCreated: new Date("2025-04-14T00:00:00.000Z"),
                        dateModified: new Date("2025-04-14T00:00:00.000Z"),
                    },
                ],
                fetchRecentConversations: vi.fn().mockResolvedValue(undefined),
            }
            return selector(store)
        })
    })

    it("renders loading state correctly", () => {
        const { container } = render(
            <SidebarProvider>
                <NavConversations />
            </SidebarProvider>
        )

        expect(container).toMatchSnapshot()
    })

    it("renders conversations list after loading", async () => {
        const { container } = render(
            <SidebarProvider>
                <NavConversations />
            </SidebarProvider>
        )
        // Wait for loading state to finish
        await vi.dynamicImportSettled()
        expect(container).toMatchSnapshot()
    })
})
