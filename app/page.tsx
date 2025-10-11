import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Trophy, Users, Zap, Calendar, TrendingUp, Code } from "lucide-react"

export default function HomePage() {
  return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1">
          <section className="relative overflow-hidden py-24 md:py-40 noise-texture">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 font-mono text-sm font-bold text-primary">
                    <TrendingUp className="w-4 h-4" />
                    10K+ BUILDERS ONLINE
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    Build Math
                    <br />
                    <span className="text-primary">Projects</span>
                    <br />
                    Win Big
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                    Create websites and projects about math topics. Real hackathons. Real competition. Join the platform
                    where teen math nerds build cool stuff.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                        size="lg"
                        asChild
                        className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      <Link href="/mathathons">
                        Start Building <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="secondary-outline" asChild className="text-lg h-14 px-8">
                      <Link href="/submit">Submit Project</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Active Mathathons", value: "47", color: "primary" },
                    { label: "Total Projects", value: "12.4K", color: "secondary" },
                    { label: "Avg. Build Time", value: "8hrs", color: "accent" },
                    { label: "Prize Pool", value: "$5K", color: "primary" },
                  ].map((stat, i) => (
                      <Card key={i} className="border-2 border-border hover:border-primary/50 transition-colors accent-bar">
                        <CardHeader className="pb-2">
                          <CardDescription className="text-xs font-mono uppercase tracking-wider">
                            {stat.label}
                          </CardDescription>
                          <CardTitle className="text-4xl font-bold font-mono">{stat.value}</CardTitle>
                        </CardHeader>
                      </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rotate-45 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rotate-12 blur-3xl" />
          </section>

          <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Live Mathathons</h2>
                  <p className="text-lg text-muted-foreground font-mono">// Pick your challenge</p>
                </div>
                <Button variant="ghost" asChild className="text-primary font-bold">
                  <Link href="/mathathons">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Spring Algebra Sprint",
                    description: "Build an interactive algebra learning tool or visualization.",
                    participants: 234,
                    daysLeft: 5,
                    difficulty: "MID",
                    color: "primary",
                  },
                  {
                    title: "Geometry Masters",
                    description: "Create a geometric proof visualizer or construction tool.",
                    participants: 189,
                    daysLeft: 12,
                    difficulty: "HARD",
                    color: "secondary",
                  },
                  {
                    title: "Number Theory Quest",
                    description: "Build a project exploring primes, divisibility, or modular arithmetic.",
                    participants: 312,
                    daysLeft: 3,
                    difficulty: "EASY",
                    color: "accent",
                  },
                ].map((mathathon, i) => (
                    <Card
                        key={i}
                        className="border-2 border-border hover:border-primary/50 transition-all group accent-bar"
                    >
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="font-mono font-bold border-2">
                            {mathathon.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 font-mono text-sm font-bold text-primary">
                            <Calendar className="w-4 h-4" />
                            {mathathon.daysLeft}d
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {mathathon.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">{mathathon.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                            <Users className="w-4 h-4" />
                            <span className="font-bold">{mathathon.participants}</span>
                          </div>
                          <Button
                              size="sm"
                              asChild
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                          >
                            <Link href={`/mathathon/${i + 1}`}>Join →</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Why MathHacks?</h2>
                <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
                  // Built different for math nerds who code
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Code,
                    title: "Build Real Projects",
                    description: "Create websites, tools, and visualizations about math topics you love.",
                    color: "primary",
                  },
                  {
                    icon: Trophy,
                    title: "Real Competition",
                    description: "Compete against the best builders. Climb leaderboards. Earn respect.",
                    color: "secondary",
                  },
                  {
                    icon: Zap,
                    title: "Ship Fast",
                    description: "Build. Submit. Get feedback. Learn from other projects.",
                    color: "accent",
                  },
                ].map((feature, i) => (
                    <div key={i} className="group">
                      <div className="mb-6">
                        <div
                            className={`inline-flex w-16 h-16 bg-${feature.color}/10 border-2 border-${feature.color}/30 items-center justify-center`}
                        >
                          <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <Card className="border-2 border-primary/30 bg-card/50 backdrop-blur accent-bar">
                <CardHeader className="text-center space-y-6 py-16">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to Build?</h2>
                  <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
                    // Stop reading. Start building.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button
                        size="lg"
                        asChild
                        className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      <Link href="/mathathons">Browse Mathathons</Link>
                    </Button>
                    <Button size="lg" variant="secondary-outline" asChild className="text-lg h-14 px-8">
                      <Link href="/create-mathathon">Create Your Own</Link>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
  )
}