"use client"

import { useState, useTransition } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield } from "lucide-react"
import { handleDeclareWinner } from "@/app/actions"

export default function DeclareWinnerPage(props: { prizes: string[]; mathathonId: string }) {
    const { mathathonId } = props
    const [submissionId, setSubmissionId] = useState("")
    const [selectedPrize, setSelectedPrize] = useState("")
    const [prizes, setPrizes] = useState<string[]>([...props.prizes]) // copy prop to state
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!submissionId || !selectedPrize) {
            setMessage({ type: "error", text: "Please enter submission ID and select a prize." })
            return
        }

        startTransition(async () => {
            const result = await handleDeclareWinner({
                mathathonId,
                submissionId,
                prize: selectedPrize,
            })

            if (result.success) {
                setMessage({ type: "success", text: result.message || "Winner added successfully." })
                setPrizes((prev) => prev.filter((p) => p !== selectedPrize))
                setSubmissionId("")
                setSelectedPrize("")
            } else {
                setMessage({ type: "error", text: result.message || "Something went wrong." })
            }
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto max-w-3xl px-6 lg:px-12">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 border-2 border-primary/30">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
                            <p className="text-muted-foreground font-mono">&#8725;&#8725; Manage mathathon prizes</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="border-2 border-primary/20 accent-bar">
                            <CardHeader>
                                <CardTitle className="text-2xl">Award Prize</CardTitle>
                                <CardDescription>Select a submission and prize to award to a winner</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="submission-id" className="font-mono font-bold">
                                        Submission ID
                                    </Label>
                                    <Input
                                        id="submission-id"
                                        placeholder="Enter submission ID"
                                        className="font-mono border-2"
                                        value={submissionId}
                                        onChange={(e) => setSubmissionId(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prize" className="font-mono font-bold">
                                        Prize
                                    </Label>
                                    <Select value={selectedPrize} onValueChange={(val) => setSelectedPrize(val)}>
                                        <SelectTrigger id="prize" className="border-2">
                                            <SelectValue placeholder="Select a prize" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {prizes.map((prize, index) => (
                                                <SelectItem key={index} value={prize}>
                                                    {prize}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {message && (
                                    <p
                                        className={`text-sm mt-2 ${
                                            message.type === "error" ? "text-red-500" : "text-green-600"
                                        }`}
                                    >
                                        {message.text}
                                    </p>
                                )}

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Submitting..." : "Award Prize"}
                                    </Button>
                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground font-mono">
                                        Note: This action will update the winner&apos;s delta and XP. Make sure the submission ID is correct before submitting.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}