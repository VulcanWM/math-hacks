import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Users, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MathathonsPage() {
    const mathathons = [
        {
            id: 1,
            title: "Spring Algebra Sprint",
            description:
                "Build an interactive algebra learning tool or visualization. Create something that helps others understand algebraic concepts.",
            participants: 234,
            status: "active",
            daysLeft: 5,
            difficulty: "Intermediate",
            startDate: "May 1, 2025",
            endDate: "May 15, 2025",
        },
        {
            id: 2,
            title: "Geometry Masters",
            description:
                "Create a geometric proof visualizer or construction tool. Build a project that explores spatial reasoning and theorems.",
            participants: 189,
            status: "active",
            daysLeft: 12,
            difficulty: "Advanced",
            startDate: "May 5, 2025",
            endDate: "May 25, 2025",
        },
        {
            id: 3,
            title: "Number Theory Quest",
            description:
                "Build a project exploring primes, divisibility, or modular arithmetic. Make number theory accessible and fun.",
            participants: 312,
            status: "active",
            daysLeft: 3,
            difficulty: "Beginner",
            startDate: "April 28, 2025",
            endDate: "May 10, 2025",
        },
        {
            id: 4,
            title: "Winter Calculus Challenge",
            description: "Create an interactive calculus learning tool covering derivatives, integrals, and limits.",
            participants: 456,
            status: "completed",
            difficulty: "Advanced",
            startDate: "Feb 1, 2025",
            endDate: "Feb 28, 2025",
        },
        {
            id: 5,
            title: "Probability Puzzles",
            description: "Build a project that visualizes probability concepts and statistical simulations.",
            participants: 298,
            status: "completed",
            difficulty: "Intermediate",
            startDate: "Mar 1, 2025",
            endDate: "Mar 20, 2025",
        },
        {
            id: 6,
            title: "Summer Combinatorics Cup",
            description: "Create a tool or visualization for combinatorial problems and counting principles.",
            participants: 0,
            status: "upcoming",
            difficulty: "Advanced",
            startDate: "Jun 1, 2025",
            endDate: "Jun 30, 2025",
        },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Header */}
                <section className="py-12 md:py-16 border-b bg-muted/30">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">All Mathathons</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Browse current, past, and upcoming math hackathons. Find the perfect challenge to build your next
                                project.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="py-8 border-b">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search mathathons..." className="pl-10" />
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Levels</SelectItem>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* Active Mathathons */}
                <section className="py-12">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <h2 className="text-2xl font-bold mb-6">Active Mathathons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mathathons
                                .filter((m) => m.status === "active")
                                .map((mathathon) => (
                                    <Card key={mathathon.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-2">
                                                <Badge variant="outline">{mathathon.difficulty}</Badge>
                                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {mathathon.daysLeft}d left
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl text-balance">{mathathon.title}</CardTitle>
                                            <CardDescription className="leading-relaxed">{mathathon.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>{mathathon.participants} participants</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {mathathon.startDate} - {mathathon.endDate}
                                            </div>
                                            <Button className="w-full" asChild>
                                                <Link href={`/mathathon/${mathathon.id}`}>View Details</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Mathathons */}
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <h2 className="text-2xl font-bold mb-6">Upcoming Mathathons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mathathons
                                .filter((m) => m.status === "upcoming")
                                .map((mathathon) => (
                                    <Card key={mathathon.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-2">
                                                <Badge variant="outline">{mathathon.difficulty}</Badge>
                                                <Badge variant="secondary">Coming Soon</Badge>
                                            </div>
                                            <CardTitle className="text-xl text-balance">{mathathon.title}</CardTitle>
                                            <CardDescription className="leading-relaxed">{mathathon.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-xs text-muted-foreground">Starts: {mathathon.startDate}</div>
                                            <Button variant="outline" className="w-full bg-transparent" asChild>
                                                <Link href={`/mathathon/${mathathon.id}`}>Learn More</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Past Mathathons */}
                <section className="py-12">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <h2 className="text-2xl font-bold mb-6">Past Mathathons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mathathons
                                .filter((m) => m.status === "completed")
                                .map((mathathon) => (
                                    <Card key={mathathon.id} className="hover:shadow-lg transition-shadow opacity-90">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-2">
                                                <Badge variant="outline">{mathathon.difficulty}</Badge>
                                                <Badge variant="secondary">Completed</Badge>
                                            </div>
                                            <CardTitle className="text-xl text-balance">{mathathon.title}</CardTitle>
                                            <CardDescription className="leading-relaxed">{mathathon.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>{mathathon.participants} participants</span>
                                            </div>
                                            <Button variant="outline" className="w-full bg-transparent" asChild>
                                                <Link href={`/browse-mathathon/${mathathon.id}`}>View Submissions</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    )
}