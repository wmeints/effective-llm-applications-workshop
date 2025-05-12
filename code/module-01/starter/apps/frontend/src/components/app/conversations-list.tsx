"use client"

import { Conversation } from "@/lib/types"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import Link from "next/link"

interface ConversationsListProps {
    conversations: Conversation[]
}

function formatDate(date: Date) {
    return date.toISOString().slice(0, 19).replace("T", " ")
}

export default function ConversationsList({
    conversations,
}: ConversationsListProps) {
    return (
        <>
            {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                    <SidebarMenuButton>
                        <Link href={`/conversations/${conversation.threadId}`}>
                            {(conversation.dateModified &&
                                formatDate(conversation.dateModified)) ||
                                formatDate(conversation.dateCreated)}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    )
}
