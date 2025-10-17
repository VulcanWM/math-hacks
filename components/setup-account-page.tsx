"use client"

import { useState, useTransition } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserCircle, Plus, X } from "lucide-react"
import { handleSetupAccount } from "@/app/actions"
import {redirect} from 'next/navigation'

export default function SetupAccountPage() {
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [bio, setBio] = useState("")
    const [links, setLinks] = useState<{ name: string; url: string }[]>([{ name: "", url: "" }])
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)


    const addLink = () => setLinks([...links, { name: "", url: "" }])
    const removeLink = (index: number) => setLinks(links.filter((_, i) => i !== index))
    const updateLink = (index: number, field: "name" | "url", value: string) => {
        const newLinks = [...links]
        newLinks[index][field] = value
        setLinks(newLinks)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!username || !fullname) {
            setMessage({ type: "error", text: "Please fill in all required fields." })
            return
        }

        startTransition(async () => {
            const formattedLinks: { [key: string]: string } = {}
            links.forEach((l) => {
                if (l.name && l.url) formattedLinks[l.name] = l.url
            })

            const result = await handleSetupAccount({
                username,
                bio,
                name: fullname,
                links: formattedLinks,
            })

            if (result.success) {
                setMessage({ type: "success", text: "Profile setup complete!" })
                redirect("/user/" + username)
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
                            <UserCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Setup Your Profile</h1>
                            <p className="text-muted-foreground font-mono">&sol;&sol; Make your mark on MathHacks</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card className="border-2 border-primary/20 accent-bar">
                            <CardHeader>
                                <CardTitle className="text-2xl">Profile Information</CardTitle>
                                <CardDescription>
                                    Tell us about yourself. This will be visible on your public profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="font-mono font-bold">
                                        Username *
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="mathwizard123"
                                        className="font-mono border-2"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        This will be your unique identifier on MathHacks
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="font-mono font-bold">
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="fullname"
                                        placeholder="Alex Chen"
                                        className="border-2"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="font-mono font-bold">
                                        Bio
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us about your math interests, what you're working on, or what you want to build..."
                                        className="min-h-[120px] border-2 resize-none"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">Max 200 characters</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="font-mono font-bold">Profile Links</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addLink}
                                            className="border-2 bg-transparent"
                                        >
                                            <Plus className="w-4 h-4 mr-1" />
                                            Add Link
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Add links to your GitHub, portfolio, or other profiles
                                    </p>

                                    <div className="space-y-3">
                                        {links.map((link, index) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    placeholder="Link name (e.g., GitHub)"
                                                    value={link.name}
                                                    onChange={(e) =>
                                                        updateLink(index, "name", e.target.value)
                                                    }
                                                    className="border-2"
                                                />
                                                <Input
                                                    placeholder="URL (e.g., https://github.com/username)"
                                                    value={link.url}
                                                    onChange={(e) =>
                                                        updateLink(index, "url", e.target.value)
                                                    }
                                                    className="border-2"
                                                />
                                                {links.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeLink(index)}
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
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Setting up..." : "Complete Setup"}
                                    </Button>

                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground font-mono">
                                        You can always update your profile later from your profile settings.
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
