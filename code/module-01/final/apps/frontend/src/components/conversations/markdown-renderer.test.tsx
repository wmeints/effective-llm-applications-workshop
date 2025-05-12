import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import MarkdownRenderer from "./markdown-renderer"

describe("MarkdownRenderer", () => {
    it("renders markdown content correctly", () => {
        const content = `
# Heading 1
## Heading 2

This is a **bold** text with a [link](https://example.com).

1. First item
2. Second item
   * Nested bullet
   * Another nested bullet

> This is a blockquote
`

        const { container } = render(<MarkdownRenderer content={content} />)
        expect(container).toMatchSnapshot()
    })

    it("renders empty content without crashing", () => {
        const { container } = render(<MarkdownRenderer content="" />)
        expect(container).toMatchSnapshot()
    })
})
