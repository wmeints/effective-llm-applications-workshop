export interface Conversation {
    id: number
    threadId: string
    dateCreated: Date
    dateModified?: Date
}

export interface ConversationDetails extends Conversation {
    messages: ChatMessage[]
}

export interface ChatMessage {
    messageId: string
    author: "User" | "Assistant"
    content: string
    timestamp: Date
}

export interface PagedConversationList {
    items: Conversation[]
    pageIndex: number
    pageSize: number
    totalItems: number
}
