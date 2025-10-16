import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground font-mono font-bold text-lg rotate-3 group-hover:rotate-6 transition-transform">
                        ∑
                    </div>
                    <span className="font-mono font-bold text-2xl tracking-tight">MathHacks</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/mathathons"
                        className="text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                    >
                        Mathathons
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
                    </Link>
                    <Link
                        href="/submit"
                        className="text-base font-medium text-muted-foreground hover:text-secondary transition-colors relative group"
                    >
                        Submit
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all" />
                    </Link>
                    <Link
                        href="/user/demo"
                        className="text-base font-medium text-muted-foreground hover:text-accent transition-colors relative group"
                    >
                        Profile
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all" />
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                        <Link href="/create-mathathon">Create</Link>
                    </Button>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <nav className="flex flex-col gap-6 mt-12">
                                <Link href="/mathathons" className="text-xl font-bold hover:text-primary transition-colors">
                                    Mathathons
                                </Link>
                                <Link href="/submit" className="text-xl font-bold hover:text-secondary transition-colors">
                                    Submit
                                </Link>
                                <Link href="/user/demo" className="text-xl font-bold hover:text-accent transition-colors">
                                    Profile
                                </Link>
                                <Button asChild className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                                    <Link href="/create-mathathon">Create Mathathon</Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}