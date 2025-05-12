import ConversationDetails from "@/components/conversations/conversation-details"
import { getConversationMessages } from "@/lib/api"

interface ConversationDetailsPageProps {
    params: Promise<{ threadId: string }>
}

export default async function ConversationDetailsPage({
    params,
}: ConversationDetailsPageProps) {
    const { threadId } = await params
    let messages = await getConversationMessages(threadId)

    if (!messages) {
        messages = []
    }

    return (
        <ConversationDetails
            threadId={threadId as string}
            messages={messages}
        />
    )
}
