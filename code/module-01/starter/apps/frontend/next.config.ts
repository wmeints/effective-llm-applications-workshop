import type { NextConfig } from "next"
import { getServiceUrl } from "@/lib/servicelocator"

const nextConfig: NextConfig = {
    reactStrictMode: false,
    rewrites: async () => {
        return [
            {
                source: "/api/chatservice/:path*",
                destination: `${getServiceUrl("chatservice")}/:path*`,
            },
        ]
    },
}

export default nextConfig
