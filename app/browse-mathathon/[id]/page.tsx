import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Trophy, ThumbsUp, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function BrowseMathathonPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const submissions = [
        {
            id: 1,
            title: "Elegant Proof Using Mathematical Induction",
            author: "Alex Chen",
            score: 98,
            views: 342,
            likes: 45,
            preview: "This solution leverages the principle of mathematical induction to prove the polynomial identity...",
            rank: 1,
        },
        {
            id: 2,
            title: "Algebraic Manipulation Approach",
            author: "Sarah Johnson",
            score: 95,
            views: 289,
            likes: 38,
            preview: "By carefully factoring and simplifying the expression, we can reveal the underlying structure...",
            rank: 2,
        },
        {
            id: 3,
            title: "Geometric Interpretation Method",
            author: "Marcus Williams",
            score: 92,
            views: 256,
            likes: 34,
            preview: "Visualizing the problem geometrically provides intuitive insight into why the solution works...",
            rank: 3,
        },
        {
            id: 4,
            title: "Recursive Solution with Dynamic Programming",
            author: "Emily Rodriguez",
            score: 90,
            views: 234,
            likes: 29,
            preview: "This approach breaks down the problem into smaller subproblems and builds up the solution...",
            rank: 4,
        },
        {
            id: 5,
            title: "Matrix-Based Linear Algebra Solution",
            author: "David Kim",
            score: 88,
            views: 198,
            likes: 25,
            preview: "Representing the system as matrices allows us to apply powerful linear algebra techniques...",
            rank: 5,
        },
        {
            id: 6,
            title: "Combinatorial Counting Argument",
            author: "Lisa Zhang",
            score: 85,
            views: 176,
            likes: 22,
            preview: "By counting the same quantity in two different ways, we establish the desired equality...",
            rank: 6,
        },
    ]

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Header */}
                <section className="py-12 md:py-16 border-b bg-muted/30">
                    <div className="container">
                        <div className="max-w-3xl">
                            <Badge variant="secondary" className="mb-4">
                                Completed
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                                Spring Algebra Sprint Submissions
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Browse all submissions from this mathathon. View solutions, learn from different approaches, and see how
                                others tackled the challenges.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters & Sort */}
                <section className="py-6 border-b bg-background sticky top-16 z-40">
                    <div className="container">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search submissions by title or author..." className="pl-10" />
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Select defaultValue="score">
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="score">Highest Score</SelectItem>
                                        <SelectItem value="likes">Most Liked</SelectItem>
                                        <SelectItem value="views">Most Viewed</SelectItem>
                                        <SelectItem value="recent">Most Recent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top 3 Podium */}
                <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-8 text-center">Top Performers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {submissions.slice(0, 3).map((submission, i) => (
                                <Card
                                    key={submission.id}
                                    className={`${i === 0 ? "md:order-2 border-2 border-primary shadow-lg" : i === 1 ? "md:order-1" : "md:order-3"}`}
                                >
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                                            <Trophy className={`w-8 h-8 text-white ${i === 0 ? "animate-pulse" : ""}`} />
                                        </div>
                                        <div className="text-4xl font-bold mb-1">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
                                        <CardTitle className="text-lg">{submission.author}</CardTitle>
                                        <CardDescription className="text-sm">{submission.title}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center space-y-3">
                                        <div className="text-3xl font-bold text-primary">{submission.score}/100</div>
                                        <Button className="w-full" size="sm" asChild>
                                            <Link href={`/submission/${submission.id}`}>View Solution</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Submissions */}
                <section className="py-12">
                    <div className="container">
                        <h2 className="text-2xl font-bold mb-6">All Submissions ({submissions.length})</h2>
                        <div className="space-y-4">
                            {submissions.map((submission) => (
                                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Rank Badge */}
                                            <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted font-bold text-lg">
                                                    #{submission.rank}
                                                </div>
                                                <Badge className="bg-primary text-primary-foreground">{submission.score}/100</Badge>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <Link href={`/submission/${submission.id}`}>
                                                        <h3 className="text-xl font-semibold hover:text-primary transition-colors text-balance">
                                                            {submission.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        by{" "}
                                                        <Link
                                                            href={`/user/${submission.author.toLowerCase().replace(" ", "-")}`}
                                                            className="hover:text-foreground font-medium"
                                                        >
                                                            {submission.author}
                                                        </Link>
                                                    </p>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed line-clamp-2">{submission.preview}</p>
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>{submission.views} views</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <ThumbsUp className="w-4 h-4" />
                                                        <span>{submission.likes} likes</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <div className="flex md:flex-col gap-2 md:justify-center">
                                                <Button asChild>
                                                    <Link href={`/submission/${submission.id}`}>View</Link>
                                                </Button>
                                            </div>
                                        </div>
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