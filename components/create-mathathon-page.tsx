"use client"

import { useState } from "react"
import { handleCreateMathathon } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransition } from "react"
import {Plus, X } from "lucide-react";
import {redirect} from 'next/navigation'

export default function CreateMathathonPage() {
    const [isPending, startTransition] = useTransition()

    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [form, setForm] = useState({
        title: "",
        mathathonType: "",
        theme: "",
        deltaValue: 100,
        startDate: "",
        endDate: "",
        declareWinnerDate: "",
    })

    const [prizes, setPrizes] = useState<{ prizeName: string; prize: string }[]>([
        { prizeName: "", prize: "" },
    ])

    const addPrize = () => setPrizes([...prizes, { prizeName: "", prize: "" }])
    const removePrize = (index: number) => setPrizes(prizes.filter((_, i) => i !== index))
    const updatePrize = (index: number, field: "prizeName" | "prize", value: string) => {
        const newPrizes = [...prizes]
        newPrizes[index][field] = value
        setPrizes(newPrizes)
    }


    const handleChange = (key: string, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const result = await handleCreateMathathon({
                title: form.title,
                mathathonType: form.mathathonType,
                theme: form.theme,
                deltaValue: form.deltaValue,
                startDate: form.startDate,
                endDate: form.endDate,
                declareWinnerDate: form.declareWinnerDate,
                prizes,
            })

            if (result.success) {
                redirect("/mathathon/" + result.message)
                setMessage({ type: "success", text: "Mathathon formatted successfully!" })
            } else {
                setMessage({ type: "error", text: result.message || "Failed to create mathathon." })
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
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Shield className="w-4 h-4" />
                                <span>Admin Only</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-balance">
                                Create New Mathathon
                            </h1>
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
                                        <Input
                                            id="title"
                                            value={form.title}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                            placeholder="e.g., Spring Algebra Sprint"
                                            required
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Choose a catchy, descriptive name for your mathathon
                                        </p>
                                    </div>

                                    {/* Mathathon Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="mathathon-type">Mathathon Type *</Label>
                                        <Select
                                            onValueChange={(v) => handleChange("mathathonType", v)}
                                            required
                                        >
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
                                        <Input
                                            id="theme"
                                            value={form.theme}
                                            onChange={(e) => handleChange("theme", e.target.value)}
                                            placeholder="e.g., Algebra, Geometry, Calculus"
                                            required
                                        />
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
                                            min="1"
                                            value={form.deltaValue}
                                            onChange={(e) => handleChange("deltaValue", Number(e.target.value))}
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
                                                <Input
                                                    id="start-date"
                                                    type="date"
                                                    className="pl-10"
                                                    value={form.startDate}
                                                    onChange={(e) => handleChange("startDate", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="end-date">End Date *</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="end-date"
                                                    type="date"
                                                    className="pl-10"
                                                    value={form.endDate}
                                                    onChange={(e) => handleChange("endDate", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Declare Winner Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="declare-winner-date">Declare Winners Date *</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="declare-winner-date"
                                                type="date"
                                                className="pl-10"
                                                value={form.declareWinnerDate}
                                                onChange={(e) => handleChange("declareWinnerDate", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Date when winners will officially be announced
                                        </p>
                                    </div>

                                    {/* Prizes */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <Label className="font-semibold">Prizes</Label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addPrize}
                                                className="border"
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                Add Prize
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Add prizes for different placements or achievements
                                        </p>

                                        <div className="space-y-3">
                                            {prizes.map((p, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Input
                                                        placeholder="Prize name (e.g., 1st Place)"
                                                        value={p.prizeName}
                                                        onChange={(e) => updatePrize(index, "prizeName", e.target.value)}
                                                    />
                                                    <Input
                                                        placeholder="Prize (e.g., £100 + Trophy)"
                                                        value={p.prize}
                                                        onChange={(e) => updatePrize(index, "prize", e.target.value)}
                                                    />
                                                    {prizes.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removePrize(index)}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {message && (
                                        <p className={`text-sm mt-2 ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
                                            {message.text}
                                        </p>
                                    )}

                                    {/* Submit Button */}
                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" className="flex-1" disabled={isPending}>
                                            {isPending ? "Creating..." : "Create Mathathon"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}