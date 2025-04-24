import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ConversationInputForm } from "./conversation-input-form"
import { describe, it, expect, beforeEach, vi } from "vitest"

describe("ConversationInputForm", () => {
    const onSubmit = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders the form with textarea and submit button", () => {
        render(<ConversationInputForm onSubmit={onSubmit} />)

        expect(
            screen.getByPlaceholderText("Type your prompt here...")
        ).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: /send message/i })
        ).toBeInTheDocument()
    })

    it("submits the form with message when button is clicked", async () => {
        const user = userEvent.setup()
        render(<ConversationInputForm onSubmit={onSubmit} />)

        const textarea = screen.getByPlaceholderText("Type your prompt here...")
        const button = screen.getByRole("button", { name: /send message/i })

        await user.type(textarea, "Hello world")
        await user.click(button)

        expect(onSubmit).toHaveBeenCalledWith("Hello world")
        expect(textarea).toHaveValue("") // Form should reset after submission
    })

    it("submits the form when Ctrl+Enter is pressed", async () => {
        const user = userEvent.setup()
        render(<ConversationInputForm onSubmit={onSubmit} />)

        const textarea = screen.getByPlaceholderText("Type your prompt here...")

        // Type text and trigger Ctrl+Enter
        await user.type(textarea, "Hello world")
        await user.type(textarea, "{Control>}{Enter}{/Control}")

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith("Hello world")
        })
    })

    it("prevents submission with empty message", async () => {
        const user = userEvent.setup()
        render(<ConversationInputForm onSubmit={onSubmit} />)

        const button = screen.getByRole("button", { name: /send message/i })
        await user.click(button)

        expect(onSubmit).not.toHaveBeenCalled()
    })

    it("disables form elements when loading", () => {
        render(<ConversationInputForm onSubmit={onSubmit} isLoading={true} />)

        const textarea = screen.getByPlaceholderText("Type your prompt here...")
        const button = screen.getByRole("button", { name: /send message/i })

        expect(textarea).toBeDisabled()
        expect(button).toBeDisabled()
    })

    it("starts with default height", () => {
        render(<ConversationInputForm onSubmit={onSubmit} />)

        const textarea = screen.getByPlaceholderText("Type your prompt here...")
        expect(textarea.closest("textarea")).toHaveClass("h-14")
    })

    it("handles submission error gracefully", async () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {})
        const errorOnSubmit = vi
            .fn()
            .mockRejectedValue(new Error("Submission failed"))

        const user = userEvent.setup()
        render(<ConversationInputForm onSubmit={errorOnSubmit} />)

        const textarea = screen.getByPlaceholderText("Type your prompt here...")
        const button = screen.getByRole("button", { name: /send message/i })

        await user.type(textarea, "Hello world")
        await user.click(button)

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalled()
        })

        consoleErrorSpy.mockRestore()
    })
})
