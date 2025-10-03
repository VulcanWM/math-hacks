export default async function UserPage({
                                                 params,
                                             }: {
    params: Promise<{ username: string }>
}) {
    const { username } = await params
    return <p>User: {username}</p>
}