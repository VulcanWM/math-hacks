import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Users, Clock, Trophy, FileText, Target } from "lucide-react"

export default async function MathathonDetailPage({ params }: { params: { id: string } }) {
    const {id} = await params;
    const mathathon = {
        id: id,
        title: "Spring Algebra Sprint",
        description:
            "Tackle challenging algebra problems in this fast-paced competition. Perfect for students looking to sharpen their algebraic thinking and problem-solving skills.",
        longDescription:
            "This mathathon focuses on advanced algebraic concepts including polynomial equations, systems of equations, inequalities, and abstract algebra fundamentals. Participants will face a series of progressively challenging problems designed to test both computational skills and theoretical understanding.",
        participants: 234,
        status: "active",
        daysLeft: 5,
        difficulty: "Intermediate",
        startDate: "May 1, 2025",
        endDate: "May 15, 2025",
        topics: ["Polynomials", "Systems of Equations", "Inequalities", "Functions"],
        rules: [
            "All submissions must be original work",
            "Show all steps and reasoning in your solutions",
            "Submissions accepted until 11:59 PM on the end date",
            "Collaboration is not permitted",
            "Use of calculators and reference materials is allowed",
        ],
        prizes: [
            "1st Place: $500 + Certificate",
            "2nd Place: $300 + Certificate",
            "3rd Place: $200 + Certificate",
            "Top 10: Recognition on leaderboard",
        ],
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-12 md:py-16 border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 math-grid-pattern">
                    <div className="container">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Badge variant="outline" className="text-base px-3 py-1">
                                    {mathathon.difficulty}
                                </Badge>
                                <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {mathathon.daysLeft} days left
                                </Badge>
                                <Badge variant="secondary" className="text-base px-3 py-1">
                                    <Users className="w-4 h-4 mr-1" />
                                    {mathathon.participants} joined
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">{mathathon.title}</h1>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">{mathathon.description}</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" asChild>
                                    <Link href="/submit">Submit Solution</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={`/browse-mathathon/${mathathon.id}`}>View Submissions</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        About This Mathathon
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">{mathathon.longDescription}</p>

                                    <div>
                                        <h3 className="font-semibold mb-2">Topics Covered:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {mathathon.topics.map((topic, i) => (
                                                <Badge key={i} variant="secondary">
                                                    {topic}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Rules */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-5 h-5" />
                                        Rules & Guidelines
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {mathathon.rules.map((rule, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-primary font-mono font-bold">{i + 1}.</span>
                                                <span className="text-muted-foreground leading-relaxed">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Prizes */}
                            <Card className="border-2 border-secondary/20 bg-secondary/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-secondary" />
                                        Prizes & Recognition
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {mathathon.prizes.map((prize, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-secondary font-bold">•</span>
                                                <span className="text-muted-foreground leading-relaxed">{prize}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                                        <p className="font-semibold">{mathathon.startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">End Date</p>
                                        <p className="font-semibold">{mathathon.endDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                                        <p className="font-semibold text-primary">{mathathon.daysLeft} days</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Statistics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Participants</span>
                                        <span className="font-semibold">{mathathon.participants}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Submissions</span>
                                        <span className="font-semibold">187</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Avg. Score</span>
                                        <span className="font-semibold">78/100</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full" asChild>
                                        <Link href="/submit">Submit Solution</Link>
                                    </Button>
                                    <Button variant="outline" className="w-full bg-transparent" asChild>
                                        <Link href={`/browse-mathathon/${mathathon.id}`}>Browse Submissions</Link>
                                    </Button>
                                    <Button variant="ghost" className="w-full">
                                        Share Mathathon
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
