export default async function BrowseMathathonPage({
                                                params,
                                            }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <p>Mathathon entries for: {id}</p>
}