"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
    content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-sm max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    ol: ({ ...props }) => (
                        <ol
                            className="space-y-2 list-decimal pl-6"
                            {...props}
                        />
                    ),
                    li: ({ ...props }) => <li className="my-1" {...props} />,
                    p: ({ ...props }) => (
                        <p className="mb-4 last:mb-0" {...props} />
                    ),
                    strong: ({ ...props }) => (
                        <span className="font-semibold" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}
