'use server'

import {get_user_from_email, create_user, create_mathathon} from "@/lib/database"
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

export async function handleCreateMathathon({
                                                title,
                                                mathathonType,
                                                theme,
                                                deltaValue,
                                                startDate,
                                                endDate,
                                                declareWinnerDate,
                                                prizes
                                            }: {
    title: string
    mathathonType: string
    theme: string
    deltaValue: number
    startDate: string
    endDate: string
    declareWinnerDate: string,
    prizes: { prizeName: string; prize: string }[]
}) {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email || null

    if (!email) {
        return { success: false, message: 'You are not logged in.' }
    }

    const user = await get_user_from_email(email)

    if (user == false) {
        return { success: false, message: 'You are not logged in.' }
    }

    if (user.admin == false) {
        return { success: false, message: 'You are not an admin.' }
    }

    const result = await create_mathathon(title, mathathonType, theme, Number(deltaValue), new Date(startDate), new Date(endDate), new Date(declareWinnerDate), prizes, user._id)


    // You’ll later replace this with your DB logic
    // e.g., await Mathathon.create(mathathonData)

    revalidatePath('/')

    return result
}
