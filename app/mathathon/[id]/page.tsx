import { redirect } from 'next/navigation'
import MathathonPage from '@/components/mathathon-page'
import {
    get_mathathon_from_id,
    get_number_of_joins,
    get_number_of_submissions,
    has_user_joined,
    get_user_mathathon_submission,
    get_user_from_email
} from "@/lib/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function Mathathon({ params }: { params: { id: string } }) {
    const { id } = await params
    const mathathonDoc = await get_mathathon_from_id(id)

    if (!mathathonDoc){
        redirect(`/`)
    }

    const joins = await get_number_of_joins(mathathonDoc._id)
    const submissions = await get_number_of_submissions(mathathonDoc._id)

    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    let userJoined = false;
    let userSubmission = false;
    let loggedIn = false;
    let isUser = false;
    if (email != null){
        loggedIn = true;
        const user = await get_user_from_email(email);
        if (user != false){
            isUser = true
            userJoined = await has_user_joined(user._id, id)
            userSubmission = await get_user_mathathon_submission(user._id, id)
        }
    }

    return <MathathonPage mathathonDoc={JSON.parse(JSON.stringify(mathathonDoc))} joins={joins} submissions={JSON.parse(JSON.stringify(submissions))} userJoined={userJoined} userSubmission={JSON.parse(JSON.stringify(userSubmission))} loggedIn={loggedIn} isUser={isUser} />
}