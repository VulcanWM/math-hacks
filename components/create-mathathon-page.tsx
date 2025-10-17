"use client"

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
                                    Provide information about the competition, including title, type, and timeline.
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

                                    {/* Mathathon Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mathathon-type">Mathathon Type *</Label>
                                        <Select required>
                                            <SelectTrigger id="mathathon-type">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                                                <SelectItem value="special">Special</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                            Specify whether bi-weekly or special mathathon
                                        </p>
                                    </div>

                                    {/* Theme */}
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Theme *</Label>
                                        <Input id="theme" placeholder="e.g., Algebra, Geometry, Calculus" required />
                                        <p className="text-xs text-muted-foreground">
                                            Define the main mathematical focus area
                                        </p>
                                    </div>

                                    {/* Delta Value */}
                                    <div className="space-y-2">
                                        <Label htmlFor="delta-value">Delta Value *</Label>
                                        <Input
                                            id="delta-value"
                                            type="number"
                                            placeholder="e.g., 10"
                                            min="1"
                                            defaultValue={100}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Determines how many delta user gains on submission
                                        </p>
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

                                    {/* Declare Winner Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="declare-winner-date">Declare Winners Date *</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="declare-winner-date" type="date" className="pl-10" required />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Date when winners will officially be announced
                                        </p>
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
                                <p>• Set realistic timelines - typically 1–4 weeks works well</p>
                                <p>• Clearly state difficulty level or type to attract the right audience</p>
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
