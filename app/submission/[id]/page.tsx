import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThumbsUp, Eye, Calendar, Trophy, FileText, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {get_submission_from_id, get_user_from_email} from "@/lib/database";
import {redirect} from 'next/navigation'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";


export default async function SubmissionDetailPage({ params }: { params: { id: string } }) {
    const {id} = await params;

    const submission: {
        title: string,
        shortDescription: string,
        participant: {
            _id: string,
            name: string,
            username: string,
            role: string,
        },
        mathathon: {
            title: string,
            _id: string,
            declareWinnerDate: Date,
            startDate: Date,
            theme: string,
        },
        repoLink: string,
        runnableLink: string,
    } = await get_submission_from_id(id)
    console.log(submission);

    if (!submission) {
        redirect("/mathathons")
    }

    const now = new Date()

    if (now < submission.mathathon.declareWinnerDate){
        const authUser = await getServerSession(authOptions);
        const email = authUser?.user?.email || null
        if (email == null){
            redirect("/mathathons")
        }

        const user = await get_user_from_email(email);

        if (user == false){
            redirect(`/mathathons`)
        }

        if (user.role == 'admin' || submission.participant._id == user._id){
        } else {
            redirect("/mathathons")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Header */}
                <section className="py-12 md:py-16 border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="max-w-3xl">
                            {/*<div className="flex items-center gap-3 mb-4">*/}
                            {/*    <Badge className="bg-primary text-primary-foreground">*/}
                            {/*        <Trophy className="w-3 h-3 mr-1" />*/}
                            {/*        Rank #{submission.rank}*/}
                            {/*    </Badge>*/}
                            {/*    <Badge variant="outline">Score: {submission.score}/100</Badge>*/}
                            {/*</div>*/}

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">{submission.title}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                                <Link
                                    href={`/user/${submission.participant.username}`}
                                    className="flex items-center gap-2 hover:text-foreground"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                                        {submission.participant.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <span className="font-medium">{submission.participant.name}</span>
                                </Link>
                                <Separator orientation="vertical" className="h-6" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{submission.mathathon.startDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                </div>

                                <div className="w-full mt-4">
                                    <p className="text-sm text-muted-foreground mb-2">Submitted for:</p>
                                    <Link href={`/mathathon/${submission.mathathon._id}`} className="text-primary hover:underline font-medium">
                                        {submission.mathathon.title}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="py-12">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Submisssion
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                                        <div className="space-y-6 text-foreground">
                                            <div>
                                                <h2 className="text-2xl font-bold mb-3">Description</h2>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {submission.shortDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <ExternalLink className="w-5 h-5" />
                                            External Links
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li key={"repoLink"}>
                                                <a
                                                    href={submission.repoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline flex items-center gap-2 text-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Repository Link
                                                </a>
                                            </li>
                                            <li key={"runnableLink"}>
                                                <a
                                                    href={submission.runnableLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline flex items-center gap-2 text-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Runnable Link
                                                </a>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Author Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">About the Author</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {submission.participant.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{submission.participant.name}</p>
                                                <p className="text-sm text-muted-foreground">@{submission.participant.username}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full bg-transparent" asChild>
                                            <Link href={`/user/${submission.participant.username}`}>View Profile</Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/*/!* Stats Card *!/*/}
                                {/*<Card>*/}
                                {/*    <CardHeader>*/}
                                {/*        <CardTitle className="text-lg">Submission Stats</CardTitle>*/}
                                {/*    </CardHeader>*/}
                                {/*    <CardContent className="space-y-3">*/}
                                {/*        <div className="flex items-center justify-between">*/}
                                {/*            <span className="text-sm text-muted-foreground">Score</span>*/}
                                {/*            <Badge className="bg-primary text-primary-foreground">{submission.score}/100</Badge>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center justify-between">*/}
                                {/*            <span className="text-sm text-muted-foreground">Rank</span>*/}
                                {/*            <span className="font-semibold">#{submission.rank}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center justify-between">*/}
                                {/*            <span className="text-sm text-muted-foreground">Views</span>*/}
                                {/*            <span className="font-semibold">{submission.views}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="flex items-center justify-between">*/}
                                {/*            <span className="text-sm text-muted-foreground">Likes</span>*/}
                                {/*            <span className="font-semibold">{submission.likes}</span>*/}
                                {/*        </div>*/}
                                {/*    </CardContent>*/}
                                {/*</Card>*/}

                                {/*/!* Actions *!/*/}
                                {/*<Card className="bg-primary/5 border-primary/20">*/}
                                {/*    <CardHeader>*/}
                                {/*        <CardTitle className="text-lg">Actions</CardTitle>*/}
                                {/*    </CardHeader>*/}
                                {/*    <CardContent className="space-y-3">*/}
                                {/*        /!*<Button variant="outline" className="w-full bg-transparent">*!/*/}
                                {/*        /!*    Share*!/*/}
                                {/*        /!*</Button>*!/*/}
                                {/*        <Button variant="outline" className="w-full bg-transparent" asChild>*/}
                                {/*            <Link href={`/mathathon/${submission.mathathon._id}`}>View Mathathon</Link>*/}
                                {/*        </Button>*/}
                                {/*    </CardContent>*/}
                                {/*</Card>*/}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    )
}
