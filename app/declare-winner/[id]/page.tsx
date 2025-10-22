import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield } from "lucide-react"
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import {get_mathathon_from_id, get_user_from_email} from "@/lib/database";
import mongoose from "mongoose";

type MathathonType = {
    prizes: {
        prizeName: string
        prize: string
    }[]
    winners: {
        submission: mongoose.Schema.Types.ObjectId
        participant: mongoose.Schema.Types.ObjectId
        prize: string
    }[]
} | false


export default async function DeclareWinner({ params }: { params: { id: string } }) {
    const {id} = await params;

    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email == null){
        redirect("/mathathons")
    }

    const user = await get_user_from_email(email);

    if (user == false) {
        redirect(`/mathathons`)
    }

    if (user.role != 'admin'){
        redirect("/mathathons")
    }

    const mathathon: MathathonType = await get_mathathon_from_id(id)

    if (mathathon == false){
        redirect(`/mathathons`)
    }

    let prizes = mathathon.prizes.map(p => p.prizeName)

    for (const winner of mathathon.winners) {
        prizes = prizes.filter(prize => prize !== winner.prize)
    }

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
                            <p className="text-muted-foreground font-mono">&#8725;&#8725; Manage mathathon prizes</p>
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
                                    Submission ID
                                </Label>
                                <Input
                                    id="submission-id"
                                    placeholder="Enter submission ID"
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
                                        {prizes.map((prize, index) => (
                                            <SelectItem key={index} value={prize}>{prize}</SelectItem>
                                        ))}
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
                                    Note: This action will update the winner&apos;s delta and XP. Make sure the submission ID is correct before
                                    submitting.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
