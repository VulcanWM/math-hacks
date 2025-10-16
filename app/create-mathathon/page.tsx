import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CreateMathathonPage from '@/components/create-mathathon-page'
import {get_user_from_email} from "@/lib/database";

export default async function CreateMathathon() {
  const authUser = await getServerSession(authOptions);
  const email = authUser?.user?.email || null
  if (email == null){
    redirect("/api/auth/signin")
  }

  const user = await get_user_from_email(email)

  if (user == false){
    redirect('/setup-account')
  }

  if (user.role != 'admin'){
    redirect('/')
  }

  return (
      <CreateMathathonPage/>
  )
}