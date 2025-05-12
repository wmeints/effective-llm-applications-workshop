import { cleanup } from "@testing-library/react"
import { afterEach, beforeEach, vi, expect } from "vitest"
import "@testing-library/jest-dom/vitest"

afterEach(() => cleanup())

beforeEach(() => {
    vi.clearAllMocks()
})
