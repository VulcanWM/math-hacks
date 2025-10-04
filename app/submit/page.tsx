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
import { Upload, LinkIcon, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileName, setFileName] = useState<string>("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFileName(file.name)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        alert("Submission successful!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1 py-12">
                <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">Submit Your Project</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Share your math project with the community. Upload your website, tool, or visualization.
                            </p>
                        </div>

                        {/* Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Details</CardTitle>
                                <CardDescription>Fill in the information below to submit your solution to a mathathon.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Select Mathathon */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mathathon">Select Mathathon *</Label>
                                        <Select required>
                                            <SelectTrigger id="mathathon">
                                                <SelectValue placeholder="Choose a mathathon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Spring Algebra Sprint</SelectItem>
                                                <SelectItem value="2">Geometry Masters</SelectItem>
                                                <SelectItem value="3">Number Theory Quest</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">Select which mathathon you're submitting for</p>
                                    </div>

                                    {/* Submission Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Submission Title *</Label>
                                        <Input id="title" placeholder="e.g., Elegant Proof Using Induction" required />
                                        <p className="text-xs text-muted-foreground">Give your submission a descriptive title</p>
                                    </div>

                                    {/* Solution Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Solution Description *</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Explain your approach, methodology, and key insights..."
                                            rows={8}
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">Describe your solution process and reasoning</p>
                                    </div>

                                    {/* File Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="file">Upload File (Optional)</Label>
                                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                                            <input
                                                id="file"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                            />
                                            <label htmlFor="file" className="cursor-pointer">
                                                <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                                                {fileName ? (
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-foreground">{fileName}</p>
                                                        <p className="text-xs text-muted-foreground">Click to change file</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-foreground">Click to upload</p>
                                                        <p className="text-xs text-muted-foreground">PDF, DOC, TXT, or images (max 10MB)</p>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {/* External Links */}
                                    <div className="space-y-2">
                                        <Label htmlFor="links">External Links (Optional)</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Textarea
                                                id="links"
                                                placeholder="Add links to external resources, code repositories, or additional materials (one per line)"
                                                rows={3}
                                                className="pl-10"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Include any relevant external resources or supplementary materials
                                        </p>
                                    </div>

                                    {/* Additional Notes */}
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Any additional comments, acknowledgments, or context..."
                                            rows={3}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Solution"}
                                        </Button>
                                        <Button type="button" variant="outline" disabled={isSubmitting}>
                                            Save Draft
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Guidelines Card */}
                        <Card className="mt-6 border-secondary/20 bg-secondary/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Submission Guidelines
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <p>• Clearly explain your solution process and reasoning</p>
                                <p>• Show all work and intermediate steps</p>
                                <p>• Use proper mathematical notation and formatting</p>
                                <p>• Cite any external resources or references used</p>
                                <p>• Ensure all uploaded files are readable and well-organized</p>
                                <p>• Submissions are final once the mathathon deadline passes</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}