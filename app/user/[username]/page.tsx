import { redirect } from 'next/navigation'
import UserProfilePage from '@/components/user-profile-page'
import {get_user_from_username, get_user_submissions} from "@/lib/database";

export default async function UserProfile({ params }: { params: { username: string } }) {
    const { username } = await params
    const userDoc = await get_user_from_username(username)

    if (!userDoc){
        redirect(`/`)
    }

    const submissions = await get_user_submissions(userDoc._id)

    return <UserProfilePage username={username} userDoc={JSON.parse(JSON.stringify(userDoc))} submissions={JSON.parse(JSON.stringify(submissions))} />
}