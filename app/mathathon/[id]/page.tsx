export default async function MathathonPage({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <p>Mathathon: {id}</p>
}