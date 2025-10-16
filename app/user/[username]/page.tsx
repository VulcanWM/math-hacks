import { redirect } from 'next/navigation'
import UserProfilePage from '@/components/user-profile-page'
import {get_user_from_username} from "@/lib/database";

export default async function UserProfile({ params }: { params: { username: string } }) {
    const { username } = await params
    const user = await get_user_from_username(username)

    if (!user){
        redirect(`/`)
    }

    return <UserProfilePage username={username} />
}