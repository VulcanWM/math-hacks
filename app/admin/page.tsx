import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield } from "lucide-react"

export default function AdminPage() {
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
                            <p className="text-muted-foreground font-mono">&sol;&sol; Manage mathathon prizes</p>
                        </div>
                    </div>

                    <Card className="border-2 border-primary/20 accent-bar">
                        <CardHeader>
                            <CardTitle className="text-2xl">Award Prize</CardTitle>
                            <CardDescription>Select a mathathon and prize to award to winners</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="mathathon-id" className="font-mono font-bold">
                                    Mathathon ID
                                </Label>
                                <Input
                                    id="mathathon-id"
                                    placeholder="Enter mathathon ID (e.g., 1, 2, 3)"
                                    className="font-mono border-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prize" className="font-mono font-bold">
                                    Prize
                                </Label>
                                <Select>
                                    <SelectTrigger id="prize" className="border-2">
                                        <SelectValue placeholder="Select a prize" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Place - $500 + 1000 XP</SelectItem>
                                        <SelectItem value="2nd">2nd Place - $300 + 750 XP</SelectItem>
                                        <SelectItem value="3rd">3rd Place - $200 + 500 XP</SelectItem>
                                        <SelectItem value="participation">Participation - 100 XP</SelectItem>
                                        <SelectItem value="custom">Custom Prize</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base">
                                    Award Prize
                                </Button>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm text-muted-foreground font-mono">
                                    Note: This action will update the winner&apos;s delta and XP. Make sure the mathathon ID is correct before
                                    submitting.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6 border-2 border-secondary/20 bg-secondary/5">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary font-mono">47</div>
                                    <div className="text-xs text-muted-foreground">Active Mathathons</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-secondary font-mono">234</div>
                                    <div className="text-xs text-muted-foreground">Pending Reviews</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent font-mono">$12.4K</div>
                                    <div className="text-xs text-muted-foreground">Total Awarded</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
