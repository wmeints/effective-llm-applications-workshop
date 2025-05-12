import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
} from "../ui/sidebar"
import NavConversations from "./nav-conversations"

import NavUser from "./nav-user"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <Link href="/" className="font-xl font-semibold">
                    Agent Workshop
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuButton asChild>
                                <Button variant="outline" asChild>
                                    <Link href="/">
                                        <Plus />
                                        <span>New conversation</span>
                                    </Link>
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Conversations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <NavConversations />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
