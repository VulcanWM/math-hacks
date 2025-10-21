"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FileText } from "lucide-react"
import { handleSubmitSubmission } from "@/app/actions"
import { useRouter } from "next/navigation"

export default function SubmitPage(props: {
    mathathon: {
        _id: string
        title: string
        theme: string
        mathathonType: string
        startDate: string | Date
        endDate: string | Date
        declareWinnerDate: string | Date
        deltaValue: number
        prizes: { prizeName: string; prize: string }[]
    }
}) {
    const { mathathon } = props
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    // Form fields
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [repoLink, setRepoLink] = useState("")
    const [runnableLink, setRunnableLink] = useState("")
    const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description || !repoLink || !runnableLink || !thumbnail) {
            setMessage({ type: "error", text: "Please fill in all required fields." })
            return
        }

        startTransition(async () => {
            const result = await handleSubmitSubmission({
                mathathonId: mathathon._id,
                title,
                description,
                thumbnail,
                repoLink,
                runnableLink,
            })

            if (result.success) {
                setMessage({ type: "success", text: result.message })
                router.push("/submission/" + String(result.message._id))
            } else {
                setMessage({ type: "error", text: result.message || "Something went wrong." })
            }
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1 py-12">
                <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
                                Submit Your Project to {mathathon.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Share your math project with the community. Upload your website, tool, or visualisation.
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Details</CardTitle>
                                <CardDescription>
                                    Fill in the information below to submit your solution to {mathathon.title}.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Submission Title *</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g., Guessing Game about Sequences"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Submission Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={6}
                                            placeholder="Explain your project.."
                                            required
                                        />
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="space-y-2">
                                        <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                                        <Input
                                            id="thumbnail"
                                            type="url"
                                            value={thumbnail}
                                            onChange={(e) => setThumbnail(e.target.value)}
                                            placeholder="https://example.com/thumbnail.png"
                                            required
                                        />
                                    </div>

                                    {/* Repo link */}
                                    <div className="space-y-2">
                                        <Label htmlFor="repo">Repository Link *</Label>
                                        <Input
                                            id="repo"
                                            type="url"
                                            value={repoLink}
                                            onChange={(e) => setRepoLink(e.target.value)}
                                            placeholder="https://github.com/username/project"
                                            required
                                        />
                                    </div>

                                    {/* Runnable link */}
                                    <div className="space-y-2">
                                        <Label htmlFor="runnable">Runnable Link *</Label>
                                        <Input
                                            id="runnable"
                                            type="url"
                                            value={runnableLink}
                                            onChange={(e) => setRunnableLink(e.target.value)}
                                            placeholder="https://your-project-demo.vercel.app"
                                            required
                                        />
                                    </div>

                                    {/* Message */}
                                    {message.text && (
                                        <p
                                            className={`text-sm ${
                                                message.type === "success"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {message.text}
                                        </p>
                                    )}

                                    {/* Submit */}
                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" className="flex-1" disabled={isPending}>
                                            {isPending ? "Submitting..." : "Submit Solution"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="mt-6 border-secondary/20 bg-secondary/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Submission Guidelines
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>• All submissions must be original work</p>
                                <p>• Collaboration is allowed but only one person gets the prize</p>
                                <p>• Use of AI is prohibited</p>
                                <p>• Your code must be open source</p>
                                <p>• Your project must be runnable on a link</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}