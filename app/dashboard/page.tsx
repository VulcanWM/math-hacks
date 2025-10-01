import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email == null){
        redirect("/api/auth/signin")
    }


    return (
        <p>{email}</p>
    )
}
