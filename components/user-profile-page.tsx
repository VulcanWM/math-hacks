import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Trophy, Calendar, Target, Award } from "lucide-react"

export default function UserProfilePage(props: {username: string, userDoc: {
    username: string, name: string, bio: string, delta: number, xp: number },
    submissions: {_id: string, title: string, description: string}[],
    badges: {submissions: { exponent: number; unlocked: boolean }
        top3: { exponent: number; unlocked: boolean }
        winner: { exponent: number; unlocked: boolean }},
}) {
    const {userDoc} = props
    const {submissions} = props
    const {badges} = props

    const items = [
        {
            icon: "📝",
            title: "Submissions",
            description: "Number of Mathathon submissions",
            base: 4,
            data: badges.submissions,
        },
        {
            icon: "🥉",
            title: "Top 3 Finishes",
            description: "Placed in the top 3 of a Mathathon",
            base: 3,
            data: badges.top3,
        },
        {
            icon: "🥇",
            title: "Wins",
            description: "First-place finishes in Mathathons",
            base: 2,
            data: badges.winner,
        },
    ]

    const user = {
        username: userDoc.username,
        name: userDoc.name,
        joinDate: "January 2024",
        bio: userDoc.bio,
        delta: userDoc.delta,
        xp: userDoc.xp,
        stats: {
            submissions: submissions.length,
            topRank: 1,
        },
        submissions: [
            {
                id: 1,
                title: "Elegant Proof Using Mathematical Induction",
                mathathon: "Spring Algebra Sprint",
                score: 98,
                rank: 1,
                date: "May 10, 2025",
            },
            {
                id: 2,
                title: "Prime Factorization Approach",
                mathathon: "Number Theory Quest",
                score: 100,
                rank: 4,
                date: "April 28, 2025",
            },
            {
                id: 3,
                title: "Recursive Solution with Memoization",
                mathathon: "Winter Calculus Challenge",
                score: 85,
                rank: 12,
                date: "February 20, 2025",
            },
        ],
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Profile Header */}
                <section className="py-12 md:py-16 border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 math-grid-pattern">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-4xl font-bold tracking-tight mb-2">{user.name}</h1>
                                    <p className="text-muted-foreground">@{user.username}</p>
                                </div>

                                <p className="text-muted-foreground leading-relaxed max-w-2xl">{user.bio}</p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {user.joinDate}</span>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                                    <div className="text-center p-3 bg-secondary/10 border-2 border-secondary/30 rounded-lg">
                                        <div className="text-2xl font-bold text-secondary font-mono">{user.delta.toLocaleString()}</div>
                                        <div className="text-xs text-muted-foreground font-mono">Delta (Δ)</div>
                                    </div>
                                    <div className="text-center p-3 bg-accent/10 border-2 border-accent/30 rounded-lg">
                                        <div className="text-2xl font-bold text-accent font-mono">{user.xp.toLocaleString()}</div>
                                        <div className="text-xs text-muted-foreground font-mono">XP</div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-lg border">
                                        <div className="text-2xl font-bold text-primary">{user.stats.submissions}</div>
                                        <div className="text-xs text-muted-foreground">Mathathon Submissions</div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-lg border">
                                        <div className="text-2xl font-bold text-primary">#{user.stats.topRank}</div>
                                        <div className="text-xs text-muted-foreground">Best Rank</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto max-w-7xl px-6 lg:px-12 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/*        /!* Main Content *!/*/}
                {/*        <div className="lg:col-span-2 space-y-4">*/}
                {/*            {submissions.map((submission) => (*/}
                {/*                <Card key={submission._id} className="hover:shadow-md transition-shadow">*/}
                {/*                    <CardHeader>*/}
                {/*                        <div className="flex items-start justify-between mb-2">*/}
                {/*                            <div className="flex-1">*/}
                {/*                                <CardTitle className="text-lg text-balance">*/}
                {/*                                    <Link*/}
                {/*                                        href={`/submission/${submission._id}`}*/}
                {/*                                        className="hover:text-primary transition-colors"*/}
                {/*                                    >*/}
                {/*                                        {submission.title}*/}
                {/*                                    </Link>*/}
                {/*                                </CardTitle>*/}
                {/*                                <CardDescription className="mt-1">*/}
                {/*                                    {submission.mathathon} • {submission.date}*/}
                {/*                                </CardDescription>*/}
                {/*                            </div>*/}
                {/*                            <Badge className="bg-primary text-primary-foreground">*/}
                {/*                                {submission.score}/100*/}
                {/*                            </Badge>*/}
                {/*                        </div>*/}
                {/*                    </CardHeader>*/}
                {/*                    <CardContent>*/}
                {/*                        <div className="flex items-center justify-between">*/}
                {/*                            <div className="flex items-center gap-2 text-sm text-muted-foreground">*/}
                {/*                                <Trophy className="w-4 h-4" />*/}
                {/*                                <span>Rank #{submission.rank}</span>*/}
                {/*                            </div>*/}
                {/*                            <Button size="sm" variant="outline" asChild>*/}
                {/*                                <Link href={`/submission/${submission.id}`}>View</Link>*/}
                {/*                            </Button>*/}
                {/*                        </div>*/}
                {/*                    </CardContent>*/}
                {/*                </Card>*/}
                {/*            ))}*/}
                {/*        </div>*/}

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Achievements */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        Achievements
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    {items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                                        >
                                            <div className="text-2xl">{item.icon}</div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm flex items-center gap-2">
                                                    {item.title}
                                                    <Badge
                                                        className={`text-xs px-2 py-1 ${
                                                            item.data.unlocked
                                                                ? "bg-green-500 text-white"
                                                                : "bg-gray-200 text-gray-400"
                                                        }`}
                                                    >
                                                        {item.data.unlocked
                                                            ? `${item.base}^${item.data.exponent}`
                                                            : `${item.base}^0`}
                                                    </Badge>
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
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