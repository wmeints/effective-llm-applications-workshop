"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

// Define the validation schema for the form
const conversationSchema = z.object({
    message: z.string().min(1, "Please enter a message"),
})

// Create a type from the schema
type ConversationFormValues = z.infer<typeof conversationSchema>

interface ConversationInputFormProps {
    onSubmit: (prompt: string) => Promise<void>
    isLoading?: boolean
}

export function ConversationInputForm({
    onSubmit,
    isLoading = false,
}: ConversationInputFormProps) {
    const [inputHeight, setInputHeight] = useState("h-14")

    const form = useForm<ConversationFormValues>({
        resolver: zodResolver(conversationSchema),
        defaultValues: {
            message: "",
        },
    })

    async function handleSubmit(values: ConversationFormValues) {
        try {
            await onSubmit(values.message)
            form.reset()
            setInputHeight("h-14") // Reset height after submission
        } catch (error) {
            console.error("Failed to send message:", error)
        }
    }

    function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const scrollHeight = e.target.scrollHeight
        if (scrollHeight <= 56) {
            setInputHeight("h-14")
        } else if (scrollHeight <= 112) {
            setInputHeight("h-28")
        } else {
            setInputHeight("h-40")
        }
    }

    function handleTextareaKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            form.handleSubmit(handleSubmit)()
            e.preventDefault()
            return false
        }

        return true
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="relative rounded-md border shadow-sm mb-4 max-w-5xl mx-auto w-5xl"
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Type your prompt here..."
                                    className={`resize-none ${inputHeight} px-4 py-3 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 border-0`}
                                    {...field}
                                    onKeyUp={handleTextareaKeyUp}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        handleTextareaChange(e)
                                    }}
                                    disabled={isLoading}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    size="icon"
                    className="absolute bottom-2 right-2"
                    disabled={isLoading}
                >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                </Button>
            </form>
        </Form>
    )
}
