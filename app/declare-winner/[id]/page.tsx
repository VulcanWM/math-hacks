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
import DeclareWinnerPage from "@/components/declare-winner-page";

type MathathonType = {
    _id: string
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

    if (!mathathon){
        redirect(`/mathathons`)
    }

    let prizes = mathathon.prizes.map(p => p.prizeName)

    for (const winner of mathathon.winners) {
        prizes = prizes.filter(prize => prize !== winner.prize)
    }

    return <DeclareWinnerPage prizes={prizes} mathathonId={mathathon._id}/>
}
