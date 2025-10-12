// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { SiteHeader } from "@/components/site-header"
// import { SiteFooter } from "@/components/site-footer"
// import { ThumbsUp, Eye, Calendar, Trophy, FileText, ExternalLink } from "lucide-react"
// import { Separator } from "@/components/ui/separator"
//
// export default async function SubmissionDetailPage({ params }: { params: { id: string } }) {
//     const {id} = await params;
//     const submission = {
//         id: id,
//         title: "Elegant Proof Using Mathematical Induction",
//         author: "Alex Chen",
//         authorUsername: "alex-chen",
//         mathathon: "Spring Algebra Sprint",
//         mathathonId: 1,
//         score: 98,
//         rank: 1,
//         views: 342,
//         likes: 45,
//         submittedDate: "May 10, 2025",
//         content: `
// # Solution Overview
//
// This solution leverages the principle of mathematical induction to prove the polynomial identity in question. The approach is both elegant and rigorous, demonstrating a deep understanding of algebraic structures.
//
// ## Methodology
//
// ### Step 1: Base Case
// First, we establish the base case for n = 1:
//
// $$P(1) = 1^3 = 1 = \\frac{1^2(1+1)^2}{4}$$
//
// This confirms our base case holds true.
//
// ### Step 2: Inductive Hypothesis
// Assume the statement holds for some arbitrary k ≥ 1:
//
// $$1^3 + 2^3 + 3^3 + ... + k^3 = \\frac{k^2(k+1)^2}{4}$$
//
// ### Step 3: Inductive Step
// We must prove that P(k+1) holds:
//
// $$1^3 + 2^3 + ... + k^3 + (k+1)^3 = \\frac{(k+1)^2(k+2)^2}{4}$$
//
// Starting from the left side and using our inductive hypothesis:
//
// $$\\frac{k^2(k+1)^2}{4} + (k+1)^3$$
//
// Factoring out (k+1)²:
//
// $$= \\frac{(k+1)^2[k^2 + 4(k+1)]}{4}$$
//
// $$= \\frac{(k+1)^2(k^2 + 4k + 4)}{4}$$
//
// $$= \\frac{(k+1)^2(k+2)^2}{4}$$
//
// ## Conclusion
//
// By the principle of mathematical induction, the statement holds for all positive integers n. This proof demonstrates the power of inductive reasoning in establishing algebraic identities.
//
// ## Key Insights
//
// - The factorization step is crucial for simplifying the expression
// - Recognizing (k+2)² as a perfect square completes the proof elegantly
// - This approach can be generalized to similar summation problems
//     `,
//         links: ["https://github.com/alexchen/algebra-proofs", "https://www.desmos.com/calculator/visualization"],
//     }
//
//     return (
//         <div className="flex min-h-screen flex-col">
//             <SiteHeader />
//
//             <main className="flex-1">
//                 {/* Header */}
//                 <section className="py-12 md:py-16 border-b bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//                     <div className="container max-w-5xl">
//                         <div className="flex items-center gap-3 mb-4">
//                             <Badge className="bg-primary text-primary-foreground">
//                                 <Trophy className="w-3 h-3 mr-1" />
//                                 Rank #{submission.rank}
//                             </Badge>
//                             <Badge variant="outline">Score: {submission.score}/100</Badge>
//                         </div>
//
//                         <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">{submission.title}</h1>
//
//                         <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
//                             <Link
//                                 href={`/user/${submission.authorUsername}`}
//                                 className="flex items-center gap-2 hover:text-foreground"
//                             >
//                                 <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
//                                     {submission.author
//                                         .split(" ")
//                                         .map((n) => n[0])
//                                         .join("")}
//                                 </div>
//                                 <span className="font-medium">{submission.author}</span>
//                             </Link>
//                             <Separator orientation="vertical" className="h-6" />
//                             <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>{submission.submittedDate}</span>
//                             </div>
//                             <Separator orientation="vertical" className="h-6" />
//                             <div className="flex items-center gap-2">
//                                 <Eye className="w-4 h-4" />
//                                 <span>{submission.views} views</span>
//                             </div>
//                             <Separator orientation="vertical" className="h-6" />
//                             <div className="flex items-center gap-2">
//                                 <ThumbsUp className="w-4 h-4" />
//                                 <span>{submission.likes} likes</span>
//                             </div>
//                         </div>
//
//                         <div className="mt-6">
//                             <p className="text-sm text-muted-foreground mb-2">Submitted for:</p>
//                             <Link href={`/mathathon/${submission.mathathonId}`} className="text-primary hover:underline font-medium">
//                                 {submission.mathathon}
//                             </Link>
//                         </div>
//                     </div>
//                 </section>
//
//                 <div className="container max-w-5xl py-12">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Main Content */}
//                         <div className="lg:col-span-2">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <FileText className="w-5 h-5" />
//                                         Solution
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="prose prose-slate dark:prose-invert max-w-none">
//                                     <div className="space-y-6 text-foreground">
//                                         <div>
//                                             <h2 className="text-2xl font-bold mb-3">Solution Overview</h2>
//                                             <p className="text-muted-foreground leading-relaxed">
//                                                 This solution leverages the principle of mathematical induction to prove the polynomial identity
//                                                 in question. The approach is both elegant and rigorous, demonstrating a deep understanding of
//                                                 algebraic structures.
//                                             </p>
//                                         </div>
//
//                                         <div>
//                                             <h2 className="text-2xl font-bold mb-3">Methodology</h2>
//
//                                             <h3 className="text-xl font-semibold mb-2 mt-4">Step 1: Base Case</h3>
//                                             <p className="text-muted-foreground leading-relaxed mb-2">
//                                                 First, we establish the base case for n = 1:
//                                             </p>
//                                             <div className="bg-muted p-4 rounded-lg font-mono text-sm my-3">
//                                                 $${"P(1) = 1³ = 1 = 1²(1+1)²/4"}$$
//                                             </div>
//                                             <p className="text-muted-foreground leading-relaxed">This confirms our base case holds true.</p>
//
//                                             <h3 className="text-xl font-semibold mb-2 mt-6">Step 2: Inductive Hypothesis</h3>
//                                             <p className="text-muted-foreground leading-relaxed mb-2">
//                                                 Assume the statement holds for some arbitrary k ≥ 1:
//                                             </p>
//                                             <div className="bg-muted p-4 rounded-lg font-mono text-sm my-3">
//                                                 $${"1³ + 2³ + 3³ + ... + k³ = k²(k+1)²/4"}$$
//                                             </div>
//
//                                             <h3 className="text-xl font-semibold mb-2 mt-6">Step 3: Inductive Step</h3>
//                                             <p className="text-muted-foreground leading-relaxed mb-2">
//                                                 We must prove that P(k+1) holds. Starting from the left side and using our inductive hypothesis,
//                                                 we can factor and simplify to reach:
//                                             </p>
//                                             <div className="bg-muted p-4 rounded-lg font-mono text-sm my-3">$${"(k+1)²(k+2)²/4"}$$</div>
//                                         </div>
//
//                                         <div>
//                                             <h2 className="text-2xl font-bold mb-3">Conclusion</h2>
//                                             <p className="text-muted-foreground leading-relaxed">
//                                                 By the principle of mathematical induction, the statement holds for all positive integers n.
//                                                 This proof demonstrates the power of inductive reasoning in establishing algebraic identities.
//                                             </p>
//                                         </div>
//
//                                         <div>
//                                             <h2 className="text-2xl font-bold mb-3">Key Insights</h2>
//                                             <ul className="space-y-2 text-muted-foreground">
//                                                 <li>• The factorization step is crucial for simplifying the expression</li>
//                                                 <li>• Recognizing (k+2)² as a perfect square completes the proof elegantly</li>
//                                                 <li>• This approach can be generalized to similar summation problems</li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//
//                             {/* External Links */}
//                             {submission.links.length > 0 && (
//                                 <Card className="mt-6">
//                                     <CardHeader>
//                                         <CardTitle className="text-lg flex items-center gap-2">
//                                             <ExternalLink className="w-5 h-5" />
//                                             Additional Resources
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <ul className="space-y-2">
//                                             {submission.links.map((link, i) => (
//                                                 <li key={i}>
//                                                     <a
//                                                         href={link}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="text-primary hover:underline flex items-center gap-2 text-sm"
//                                                     >
//                                                         <ExternalLink className="w-4 h-4" />
//                                                         {link}
//                                                     </a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </CardContent>
//                                 </Card>
//                             )}
//                         </div>
//
//                         {/* Sidebar */}
//                         <div className="space-y-6">
//                             {/* Author Card */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">About the Author</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
//                                             {submission.author
//                                                 .split(" ")
//                                                 .map((n) => n[0])
//                                                 .join("")}
//                                         </div>
//                                         <div>
//                                             <p className="font-semibold">{submission.author}</p>
//                                             <p className="text-sm text-muted-foreground">@{submission.authorUsername}</p>
//                                         </div>
//                                     </div>
//                                     <Button variant="outline" className="w-full bg-transparent" asChild>
//                                         <Link href={`/user/${submission.authorUsername}`}>View Profile</Link>
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//
//                             {/* Stats Card */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">Submission Stats</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-muted-foreground">Score</span>
//                                         <Badge className="bg-primary text-primary-foreground">{submission.score}/100</Badge>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-muted-foreground">Rank</span>
//                                         <span className="font-semibold">#{submission.rank}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-muted-foreground">Views</span>
//                                         <span className="font-semibold">{submission.views}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-muted-foreground">Likes</span>
//                                         <span className="font-semibold">{submission.likes}</span>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//
//                             {/* Actions */}
//                             <Card className="bg-primary/5 border-primary/20">
//                                 <CardHeader>
//                                     <CardTitle className="text-lg">Actions</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-3">
//                                     <Button variant="outline" className="w-full bg-transparent">
//                                         <ThumbsUp className="w-4 h-4 mr-2" />
//                                         Like Solution
//                                     </Button>
//                                     <Button variant="outline" className="w-full bg-transparent">
//                                         Share
//                                     </Button>
//                                     <Button variant="outline" className="w-full bg-transparent" asChild>
//                                         <Link href={`/mathathon/${submission.mathathonId}`}>View Mathathon</Link>
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//
//             <SiteFooter />
//         </div>
//     )
// }

export default function Replacement() {
    return <p>hi</p>
}