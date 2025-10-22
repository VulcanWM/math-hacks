import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Search, Trophy, ThumbsUp, Eye } from "lucide-react"
import {get_mathathon_from_id, get_mathathon_submissions, get_user_from_email} from "@/lib/database";
import { redirect } from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function BrowseMathathonPage({ params }: { params: { id: string } }) {
    const { id } = await params

    let admin = false;

    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email != null){
        const user = await get_user_from_email(email)

        if (user != false){
            admin = user.role == 'admin'
        }
    }

    const mathathon = await get_mathathon_from_id(id)
    if (mathathon == false){
        redirect("/mathathons")
    }
    const submissions = await get_mathathon_submissions(id)

    const now = new Date()

    const canSee = now > mathathon.declareWinnerDate || admin
    const cannotSee = !canSee

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Header */}
                <section className="py-12 md:py-16 border-b bg-muted/30">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="max-w-3xl">
                            <Badge variant="secondary" className="mb-4">
                                Completed
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                                {mathathon.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Browse all submissions from {mathathon.title}. View other&apos;s projects and their takes on {now > mathathon.startDate ? mathathon.theme : "the secret theme"}.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Top 3 Podium */}
                <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <h2 className="text-2xl font-bold mb-8 text-center">Top 3 Podium</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {Array.from({ length: 3 }).map((_, i) => {
                                const submission = submissions[i] || null // handle missing submission
                                const podiumEmoji = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"
                                const orderClass = i === 0 ? "md:order-2" : i === 1 ? "md:order-1" : "md:order-3"
                                const borderClass = submission ? "border-2 border-primary shadow-lg" : "border border-muted/40 bg-muted/20"

                                return (
                                    <Card key={i} className={`${orderClass} ${borderClass}`}>
                                        <CardHeader className="text-center pb-4">
                                            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                                                <Trophy className={`w-8 h-8 text-white ${i === 0 && submission ? "animate-pulse" : ""}`} />
                                            </div>
                                            <div className="text-4xl font-bold mb-1">{podiumEmoji}</div>
                                            {submission ? (
                                                <>
                                                    <CardTitle className="text-lg">{submission.participant?.username || "Unknown"}</CardTitle>
                                                    <CardDescription className="text-sm">{submission.title}</CardDescription>
                                                </>
                                            ) : (
                                                <CardDescription className="text-sm text-muted-foreground">No winner</CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardContent className="text-center space-y-3">
                                            {submission ? (
                                                <>
                                                    <Button className="w-full" size="sm" asChild>
                                                        <Link href={`/submission/${submission._id}`}>View Solution</Link>
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="text-muted-foreground">—</div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {cannotSee ?
                    <section className="py-12 px-6 lg:px-12 text-center">
                        <p className={"text-amber-400"}>You can see the submissions after the winners have been released!</p>
                    </section>:
                    <section className="py-12">
                        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                            <h2 className="text-2xl font-bold mb-6">All Submissions ({submissions.length})</h2>
                            <div className="space-y-4">
                                {submissions.map((submission) => (
                                    <Card key={submission._id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Content */}
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <Link href={`/submission/${submission._id}`}>
                                                            <h3 className="text-xl font-semibold hover:text-primary transition-colors text-balance">
                                                                {submission.title}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            by{" "}
                                                            <Link
                                                                href={`/user/${submission.participant.username.toLowerCase().replace(" ", "-")}`}
                                                                className="hover:text-foreground font-medium"
                                                            >
                                                                {submission.participant.name}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed line-clamp-2">{submission.shortDescription}</p>
                                                </div>

                                                {/* Action */}
                                                <div className="flex md:flex-col gap-2 md:justify-center">
                                                    <Button asChild>
                                                        <Link href={`/submission/${submission._id}`}>View</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                }

            </main>

            <SiteFooter />
        </div>
    )
}
