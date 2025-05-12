import { getServiceUrl } from "./servicelocator"
import { ChatMessage, PagedConversationList } from "./types"

export async function getConversationMessages(
    threadId: string
): Promise<ChatMessage[] | undefined> {
    const response = await fetch(
        `${getServiceUrl("chatservice")}/conversations/${threadId}/messages`
    )

    if (!response.ok) {
        return undefined
    }

    const responseData: ChatMessage[] = await response.json()

    return responseData
}

export async function getRecentConversations() {
    const response = await fetch(
        `${getServiceUrl("chatservice")}/conversations?pageIndex=0`
    )

    if (!response.ok) {
        throw Error("Failed to load recent conversations")
    }

    const responseData: PagedConversationList = await response.json()

    // Make sure to convert the dates to real dates instead of ISO date strings
    responseData.items = responseData.items.map((x) => ({
        ...x,
        dateCreated: new Date(x.dateCreated),
        dateModified: (x.dateModified && new Date(x.dateModified)) || undefined,
    }))

    return responseData
}
