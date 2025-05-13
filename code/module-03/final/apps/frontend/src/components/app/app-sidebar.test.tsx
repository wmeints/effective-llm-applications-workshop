import { describe, expect, it, vi, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import AppSidebar from "./app-sidebar"
import { SidebarProvider } from "../ui/sidebar"

// Mock window.matchMedia
beforeAll(() => {
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
})

// Mock the useIsMobile hook
vi.mock("../hooks/use-is-mobile", () => ({
    useIsMobile: vi.fn(() => false),
}))

// Mock the NavConversations and NavUser components
vi.mock("./nav-conversations", () => ({
    default: () => <div data-testid="nav-conversations">NavConversations</div>,
}))

vi.mock("./nav-user", () => ({
    default: () => <div data-testid="nav-user">NavUser</div>,
}))

describe("AppSidebar", () => {
    it("renders correctly", () => {
        const { container } = render(
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
        )

        expect(container).toMatchSnapshot()
    })
})
