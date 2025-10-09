"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateMathathonPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        alert("Mathathon created successfully!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1 py-12">
                <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Shield className="w-4 h-4" />
                                <span>Admin Only</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Create New Mathathon</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Set up a new math hackathon challenge. Define the topic and let builders create amazing projects.
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Mathathon Details</CardTitle>
                                <CardDescription>
                                    Provide information about the competition, including title, description, and timeline.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input id="title" placeholder="e.g., Spring Algebra Sprint" required />
                                        <p className="text-xs text-muted-foreground">
                                            Choose a catchy, descriptive name for your mathathon
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the mathathon, its goals, and what participants can expect..."
                                            rows={6}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Provide a detailed overview to help participants understand the challenge
                                        </p>
                                    </div>

                                    {/* Difficulty */}
                                    <div className="space-y-2">
                                        <Label htmlFor="difficulty">Difficulty Level *</Label>
                                        <Select required>
                                            <SelectTrigger id="difficulty">
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="beginner">Beginner</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Date Range */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="start-date">Start Date *</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="start-date" type="date" className="pl-10" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="end-date">End Date *</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="end-date" type="date" className="pl-10" required />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rules */}
                                    <div className="space-y-2">
                                        <Label htmlFor="rules">Rules & Guidelines</Label>
                                        <Textarea
                                            id="rules"
                                            placeholder="List any specific rules, submission requirements, or guidelines..."
                                            rows={4}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Optional: Add specific rules or requirements for participants
                                        </p>
                                    </div>

                                    {/* Topics */}
                                    <div className="space-y-2">
                                        <Label htmlFor="topics">Topics Covered</Label>
                                        <Input id="topics" placeholder="e.g., Algebra, Geometry, Number Theory (comma-separated)" />
                                        <p className="text-xs text-muted-foreground">
                                            Help participants understand what mathematical areas will be covered
                                        </p>
                                    </div>

                                    {/* Max Participants */}
                                    <div className="space-y-2">
                                        <Label htmlFor="max-participants">Maximum Participants</Label>
                                        <Input id="max-participants" type="number" placeholder="Leave empty for unlimited" min="1" />
                                        <p className="text-xs text-muted-foreground">Optional: Set a cap on the number of participants</p>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                            {isSubmitting ? "Creating..." : "Create Mathathon"}
                                        </Button>
                                        <Button type="button" variant="outline" disabled={isSubmitting}>
                                            Save as Draft
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Tips Card */}
                        <Card className="mt-6 border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg">Tips for Creating Great Mathathons</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>• Choose a clear, engaging title that reflects the mathematical focus</p>
                                <p>• Provide detailed descriptions to help participants prepare</p>
                                <p>• Set realistic timelines - typically 1-4 weeks works well</p>
                                <p>• Clearly state difficulty level to attract the right audience</p>
                                <p>• Include specific rules about submission formats and requirements</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}