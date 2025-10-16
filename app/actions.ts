'use server'

import {get_user_from_email, create_user} from "@/lib/database"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache'

export async function handleSetupAccount({ username, bio, name, links  }: { username: string, bio: string, name: string, links: { [key: string]: string } } ) {
    const authUser = await getServerSession(authOptions)
    const email = authUser?.user?.email || null

    if (!email) {
        return { success: false, message: "You are not logged in" }
    }

    const user_from_email = await get_user_from_email(email)
    if (user_from_email) {
        return { success: false, message: "You already have an account" }
    }

    const result = await create_user(email, username, bio, name, links)
    revalidatePath("/")
    if (result == true){
        return { success: true }
    } else {
        return { success: false, message: result }
    }
}