import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Trophy, Calendar, Target, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfilePage(props: {username: string}) {
    const {username} = props
    const user = {
        username: username,
        name: "Alex Chen",
        joinDate: "January 2024",
        bio: "Passionate about mathematics and problem-solving. Love tackling challenging algebra and number theory problems. Currently studying Computer Science with a focus on algorithms.",
        delta: 1250,
        xp: 3420,
        stats: {
            submissions: 18,
            topRank: 1,
        },
        achievements: [
            { title: "1st Place Winner", description: "Spring Algebra Sprint", icon: "🥇" },
            { title: "Perfect Score", description: "Number Theory Quest", icon: "💯" },
            { title: "Top 10 Finisher", description: "5 times", icon: "⭐" },
            { title: "Early Adopter", description: "Joined in 2024", icon: "🚀" },
        ],
        mathathons: [
            {
                id: 1,
                title: "Spring Algebra Sprint",
                status: "completed",
                rank: 1,
                score: 98,
                date: "May 2025",
            },
            {
                id: 3,
                title: "Number Theory Quest",
                status: "completed",
                rank: 4,
                score: 100,
                date: "April 2025",
            },
            {
                id: 2,
                title: "Geometry Masters",
                status: "active",
                rank: null,
                score: null,
                date: "In Progress",
            },
        ],
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
                    <div className="container max-w-5xl">
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

                <div className="container max-w-5xl py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="submissions" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                                    <TabsTrigger value="mathathons">Mathathons</TabsTrigger>
                                </TabsList>

                                {/* Submissions Tab */}
                                <TabsContent value="submissions" className="space-y-4">
                                    {user.submissions.map((submission) => (
                                        <Card key={submission.id} className="hover:shadow-md transition-shadow">
                                            <CardHeader>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-lg text-balance">
                                                            <Link
                                                                href={`/submission/${submission.id}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                {submission.title}
                                                            </Link>
                                                        </CardTitle>
                                                        <CardDescription className="mt-1">
                                                            {submission.mathathon} • {submission.date}
                                                        </CardDescription>
                                                    </div>
                                                    <Badge className="bg-primary text-primary-foreground">{submission.score}/100</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Trophy className="w-4 h-4" />
                                                        <span>Rank #{submission.rank}</span>
                                                    </div>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/submission/${submission.id}`}>View</Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>

                                {/* Mathathons Tab */}
                                <TabsContent value="mathathons" className="space-y-4">
                                    {user.mathathons.map((mathathon) => (
                                        <Card key={mathathon.id} className="hover:shadow-md transition-shadow">
                                            <CardHeader>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-lg text-balance">
                                                            <Link
                                                                href={`/mathathon/${mathathon.id}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                {mathathon.title}
                                                            </Link>
                                                        </CardTitle>
                                                        <CardDescription className="mt-1">{mathathon.date}</CardDescription>
                                                    </div>
                                                    <Badge variant={mathathon.status === "active" ? "default" : "secondary"}>
                                                        {mathathon.status}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    {mathathon.status === "completed" ? (
                                                        <div className="flex items-center gap-4 text-sm">
                                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                                <Trophy className="w-4 h-4" />
                                                                <span>Rank #{mathathon.rank}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-muted-foreground">
                                                                <Target className="w-4 h-4" />
                                                                <span>Score: {mathathon.score}/100</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">Currently participating</span>
                                                    )}
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/mathathon/${mathathon.id}`}>View</Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </div>

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
                                    {user.achievements.map((achievement, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                            <div className="text-2xl">{achievement.icon}</div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{achievement.title}</p>
                                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Activity Summary */}
                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="text-lg">Activity Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Total Submissions</span>
                                        <span className="font-semibold">{user.stats.submissions}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Best Rank</span>
                                        <span className="font-semibold">#{user.stats.topRank}</span>
                                    </div>
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