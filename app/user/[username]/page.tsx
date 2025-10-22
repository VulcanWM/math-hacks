import { redirect } from 'next/navigation'
import UserProfilePage from '@/components/user-profile-page'
import {get_user_from_username, get_user_submissions, get_participant_stats, calculate_badges} from "@/lib/database";

export default async function UserProfile({ params }: { params: { username: string } }) {
    const { username } = await params
    const userDoc = await get_user_from_username(username)

    if (!userDoc){
        redirect(`/`)
    }

    const submissions = await get_user_submissions(userDoc._id)

    const stats = await get_participant_stats(userDoc._id)
    const badges = calculate_badges(stats)

    return <UserProfilePage username={username} userDoc={JSON.parse(JSON.stringify(userDoc))} submissions={JSON.parse(JSON.stringify(submissions))} badges={JSON.parse(JSON.stringify(badges))}/>
}