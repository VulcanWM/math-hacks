import Link from "next/link"
import {ArrowRight, Calculator} from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t border-border/40 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-lg">
                                <Calculator className="w-5 h-5" />
                            </div>
                            <span>MathHacks</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering teen mathematicians to build cool projects through hackathons.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/mathathons" className="hover:text-foreground transition-colors">
                                    Browse Mathathons
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit" className="hover:text-foreground transition-colors">
                                    Submit Solution
                                </Link>
                            </li>
                            <li>
                                <Link href="/create-mathathon" className="hover:text-foreground transition-colors">
                                    Create Event
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Community</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Discord
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    Rules & Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
                    <p>© 2025 MathHacks. Built for math enthusiasts, by math enthusiasts.</p>
                </div>
            </div>
        </footer>
    )
}