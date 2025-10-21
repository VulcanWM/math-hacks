import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SubmitPage from '@/components/submit-page'
import {get_user_from_email, get_mathathon_from_id, get_user_mathathon_submission} from "@/lib/database";

export default async function SubmitMathathon({ params }: { params: { id: string } }) {
    const { id } = await params
    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email == null){
        redirect("/api/auth/signin")
    }

    const user = await get_user_from_email(email);

    if (user == false){
        redirect('/setup-account')
    }

    const mathathon = await get_mathathon_from_id(id)

    if (mathathon == false){
        redirect("/mathathons")
    }

    const now = new Date()
    if (now > mathathon.endDate || now < mathathon.startDate){
        redirect("/mathathon/" + id)
    }

    const submission = await get_user_mathathon_submission(String(user._id), id)
    if (submission != false){
        redirect("/mathathon/" + id)
    }


    return (
        <SubmitPage mathathon={JSON.parse(JSON.stringify(mathathon))}/>
    )
}