interface StreamingEventData {
    type: string
    data: unknown
}

export interface DataStreamDecoderCallbacks {
    onEvent: (e: StreamingEventData) => void
}

export async function decodeDataStream(
    stream: ReadableStream<Uint8Array<ArrayBufferLike>>,
    callbacks: DataStreamDecoderCallbacks
) {
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader()

    let buffer = ""

    while (true) {
        const { value, done } = await reader.read()

        if (done) {
            return
        }

        buffer += value

        let separatorIndex = buffer.indexOf("\n\n")

        while (separatorIndex > -1 && buffer.length > 0) {
            const rawEventData = buffer.slice(0, separatorIndex)
            buffer = buffer.substring(separatorIndex + 1)

            callbacks.onEvent(parseEventData(rawEventData))

            separatorIndex = buffer.indexOf("\n\n")
        }
    }
}

function parseEventData(data: string) {
    const lines = data.split("\n")

    let eventType: string | undefined = undefined
    let eventData: unknown | undefined = undefined

    for (const line of lines) {
        const prefixIndex = line.indexOf(":")
        const prefixContent = line.slice(0, prefixIndex)

        if (prefixContent === "event") {
            eventType = line.substring(prefixIndex + 1).trim()
        }

        if (prefixContent === "data") {
            eventData = JSON.parse(line.substring(prefixIndex + 1).trim())
        }
    }

    if (eventType === undefined || eventData === undefined) {
        throw Error("Invalid event data")
    }

    return {
        type: eventType,
        data: eventData,
    }
}
