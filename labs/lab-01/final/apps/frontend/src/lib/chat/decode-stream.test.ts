import { describe, it, vi, expect } from "vitest"
import { decodeDataStream, DataStreamDecoderCallbacks } from "./decode-stream"

describe("decodeResponseStream", () => {
    it("should handle partial lines", async () => {
        const encoder = new TextEncoder()

        const callbacks: DataStreamDecoderCallbacks = {
            onEvent: vi.fn(),
        }

        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.enqueue(encoder.encode('event: test\ndata: { "cont'))
                controller.enqueue(encoder.encode('ent": "test" }\n\n'))
                controller.close()
            },
        })

        await decodeDataStream(stream, callbacks)

        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "test",
            data: { content: "test" },
        })
    })

    it("should handle full lines", async () => {
        const encoder = new TextEncoder()

        const callbacks: DataStreamDecoderCallbacks = {
            onEvent: vi.fn(),
        }

        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.enqueue(
                    encoder.encode(
                        'event: test\ndata: { "content": "test"}\n\n'
                    )
                )
                controller.close()
            },
        })

        await decodeDataStream(stream, callbacks)

        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "test",
            data: { content: "test" },
        })
    })

    it("should handle multiple events", async () => {
        const encoder = new TextEncoder()

        const callbacks: DataStreamDecoderCallbacks = {
            onEvent: vi.fn(),
        }

        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.enqueue(encoder.encode('event: test\ndata: { "cont'))
                controller.enqueue(encoder.encode('ent": "test" }\n\n'))
                controller.enqueue(encoder.encode('event: test\ndata: { "cont'))
                controller.enqueue(encoder.encode('ent": "test" }\n\n'))
                controller.close()
            },
        })

        await decodeDataStream(stream, callbacks)

        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "test",
            data: { content: "test" },
        })
        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "test",
            data: { content: "test" },
        })
    })

    it("should handle bulk messages", async () => {
        const encoder = new TextEncoder()

        const callbacks: DataStreamDecoderCallbacks = {
            onEvent: vi.fn(),
        }

        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.enqueue(
                    encoder.encode(
                        'event: delta\ndata: { "content": "test" }\n\nevent: delta\ndata: { "content": "more" }\n\n'
                    )
                )
                controller.close()
            },
        })

        await decodeDataStream(stream, callbacks)

        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "delta",
            data: { content: "test" },
        })

        expect(callbacks.onEvent).toHaveBeenCalledWith({
            type: "delta",
            data: { content: "more" },
        })
    })

    it("should handle empty streams", async () => {
        const callbacks: DataStreamDecoderCallbacks = {
            onEvent: vi.fn(),
        }

        const stream = new ReadableStream<Uint8Array>({
            start(controller) {
                controller.close()
            },
        })

        await decodeDataStream(stream, callbacks)

        expect(callbacks.onEvent).not.toHaveBeenCalled()
    })
})
