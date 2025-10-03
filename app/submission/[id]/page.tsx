export default async function SubmissionPage({
                                                      params,
                                                  }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <p>Submission: {id}</p>
}