"use client"

import { useEffect, useState } from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Skeleton } from "../ui/skeleton"
import ConversationsList from "./conversations-list"
import { useAppStore } from "@/providers/app-store-provider"
import Link from "next/link"

function ConversationsListPlaceholder() {
    return (
        <div className="space-y-4 flex flex-col">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    )
}

export default function NavConversations() {
    const [isLoading, setLoading] = useState(false)

    const conversations = useAppStore((x) => x.recentConversations)
    const fetchRecentConversations = useAppStore(
        (x) => x.fetchRecentConversations
    )

    useEffect(() => {
        setLoading(true)
        fetchRecentConversations().then(() => {
            setLoading(false)
        })
    }, [fetchRecentConversations])

    return (
        <SidebarMenu>
            {isLoading && <ConversationsListPlaceholder />}
            {!isLoading && <ConversationsList conversations={conversations} />}
            <SidebarMenuItem>
                <SidebarMenuButton className="text-muted-foreground" asChild>
                    <Link href="/conversations">Browse all conversations</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
