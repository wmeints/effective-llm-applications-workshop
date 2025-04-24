import type { Metadata } from "next"
import "./globals.css"
import AppSidebar from "@/components/app/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppStoreProvider } from "@/providers/app-store-provider"

export const metadata: Metadata = {
    title: "Ricardo",
    description: "A digital assistant for Info Support",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="h-screen">
            <body className="antialiased h-screen">
                <AppStoreProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full h-screen flex flex-col">
                            {children}
                        </main>
                    </SidebarProvider>
                </AppStoreProvider>
            </body>
        </html>
    )
}
