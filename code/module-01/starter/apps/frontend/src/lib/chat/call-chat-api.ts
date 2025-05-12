import { DataStreamDecoderCallbacks, decodeDataStream } from "./decode-stream"

interface CallChatApiEndpointOptions {
    baseUrl: string
    threadId?: string
    prompt: string
    callbacks: DataStreamDecoderCallbacks
}

export async function callChatApiEndpoint(options: CallChatApiEndpointOptions) {
    const response = await fetch(options.baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            threadId: options.threadId,
            prompt: options.prompt,
        }),
    })

    if (!response.ok) {
        throw Error(
            `Failed to invoke chat endpoint. Status code: ${response.status}`
        )
    }

    if (!response.body) {
        throw Error("Failed to parse response. Body is empty.")
    }

    await decodeDataStream(response.body, options.callbacks)
}
