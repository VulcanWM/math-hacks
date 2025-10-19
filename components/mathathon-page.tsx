"use client"

// need to add winners once i figure out how that works

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Users, Clock, Trophy, FileText, Target } from "lucide-react"
import {useState, useTransition} from "react";
import { redirect } from 'next/navigation'
import {handleJoinMathathon} from "@/app/actions";


function getTimeLeftString(targetDate: Date) {
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) return "0 minutes left";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} left`;
}

export default function MathathonPage(props: {
    mathathonDoc: {
        _id: string;
        mathathonType: string;
        theme: string;
        title: string;
        startDate: string | Date;
        endDate: string | Date;
        declareWinnerDate: string | Date;
        deltaValue: number;
        prizes: { prizeName: string; prize: string }[];
    };
    joins: number;
    submissions: number;
    userJoined: boolean;
    userSubmission: boolean | { title: string, _id: string };
    isUser: boolean,
    loggedIn: boolean
}) {
    const { mathathonDoc } = props;
    const [isPending, startTransition] = useTransition()

    const [userJoined, setUserJoined] = useState(props.userJoined);

    // Convert incoming date strings to Date objects
    const start = new Date(mathathonDoc.startDate);
    const end = new Date(mathathonDoc.endDate);
    const declareWinner = new Date(mathathonDoc.declareWinnerDate);
    const now = new Date();

    // Determine status
    let status: "A" | "B" | "C" | "D";
    let timeLeft: string;

    if (now < start) {
        status = "A";
        timeLeft = getTimeLeftString(start) + " until start";
    } else if (now >= start && now <= end) {
        status = "B";
        timeLeft = getTimeLeftString(end) + " until end";
    } else if (now > end && now <= declareWinner) {
        status = "C";
        timeLeft = getTimeLeftString(declareWinner) + " until winners declared";
    } else {
        status = "D";
        timeLeft = "Completely finished";
    }

    // Prepare prizes
    const prizes = mathathonDoc.prizes.map((p) => {
        let multiplier = 1;
        if (p.prizeName.toLowerCase().includes("1st prize")) multiplier = 5;
        else if (p.prizeName.toLowerCase().includes("2nd prize")) multiplier = 3;
        else if (p.prizeName.toLowerCase().includes("3rd prize")) multiplier = 2;

        const deltaText = `${multiplier * mathathonDoc.deltaValue} Delta + Certificate`;
        const newPrize = p.prize.trim() === "" ? deltaText : `${p.prize} + ${deltaText}`;
        return { prizeName: p.prizeName, prize: newPrize };
    });

    prizes.push({ prizeName: "Everyone", prize: `${mathathonDoc.deltaValue} Delta` });

    // Format dates
    const startDate = start.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " MIDNIGHT UTC";
    const endDate = end.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " MIDNIGHT UTC";
    const declareWinnerDate = declareWinner.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) + " MIDNIGHT UTC";

    const rules = [
        "All submissions must be original work",
        "Submissions accepted until 11:59 PM on the day before the end date",
        "Collaboration is allowed but only one person gets the prize",
        "Use of AI is prohibited",
    ];

    function handleJoinClick() {
        if (props.isUser) {
            startTransition(async () => {
                const result = await handleJoinMathathon({mathathonId: mathathonDoc._id})
                setUserJoined(result.success)
            })
        } else if (props.loggedIn) {
            redirect("/setup-account")
        } else {
            redirect("/api/auth/signin")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-12 md:py-16 border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5 math-grid-pattern">
                    <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Badge variant="outline" className="text-base px-3 py-1">
                                    {mathathonDoc.mathathonType}
                                </Badge>
                                <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {timeLeft}
                                </Badge>
                                <Badge variant="secondary" className="text-base px-3 py-1">
                                    <Users className="w-4 h-4 mr-1" />
                                    {props.joins} joined
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">{mathathonDoc.title}</h1>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">Build a creative project related to the math theme over the weekend. Submit your code and a runnable link to participate!</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {userJoined ? <>
                                    {status == "A" ? (
                                        <Button size="lg" disabled={true}>
                                            Submit Solution (Too Early)
                                        </Button>
                                    ) : <>
                                        {status == "B" ? <>
                                            {props.userSubmission == false ? (
                                                <Button size="lg" asChild>
                                                    <Link href="/submit">Submit Solution</Link>
                                                </Button>
                                            ) : (
                                                <Button size="lg" asChild>
                                                    <Link href={typeof props.userSubmission !== "boolean" ? "/submission/" + props.userSubmission?._id : ""}>View Your Submission</Link>
                                                </Button>
                                            )}
                                        </> : (
                                            <Button size="lg" disabled={true}>
                                                Submit Solution (Too Late)
                                            </Button>
                                        )}
                                    </>}
                                </> : (
                                    <Button size="lg" onClick={handleJoinClick} disabled={isPending}>
                                        {isPending ? "Joining..." : "Join Mathathon"}
                                    </Button>
                                )}
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={`/browse-mathathon/${mathathonDoc._id}`}>View Submissions</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto max-w-7xl px-6 lg:px-12 py-12">
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
                                    <p className="text-muted-foreground leading-relaxed">Build a creative project related to the math theme over the weekend. You can make anything you like—website, game, simulation, or tool - as long as you provide the source code and a runnable link. Show off your math skills through your creativity and innovation!</p>

                                    <div>
                                        <h3 className="font-semibold mb-2">Theme:</h3>
                                        {status === "A" ? (
                                            <p className="text-muted-foreground">The theme will be released once the mathathon starts!</p>
                                        ): (
                                            <Badge variant="secondary">{mathathonDoc.theme}</Badge>
                                        )}
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
                                        {rules.map((rule, i) => (
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
                                        {prizes.map((prizeObj, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-secondary font-bold">•</span>
                                                <span className="text-muted-foreground leading-relaxed">
                                                    {prizeObj.prizeName}: {prizeObj.prize}
        </span>
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
                                        <p className="font-semibold">{startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">End Date</p>
                                        <p className="font-semibold">{endDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                                        <p className="font-semibold text-primary">{timeLeft}</p>
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
                                        <span className="font-semibold">{props.joins}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Submissions</span>
                                        <span className="font-semibold">{props.submissions}</span>
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
                                        <Link href={`/browse-mathathon/${mathathonDoc._id}`}>Browse Submissions</Link>
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