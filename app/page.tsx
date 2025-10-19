import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Trophy, Users, Zap, Calendar, TrendingUp, Code } from "lucide-react"
import { get_landing_mathathons } from "@/lib/database";

export const revalidate = 60;

export default async function HomePage() {

  const mathathons = await get_landing_mathathons();

  return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1">
          <section className="relative overflow-hidden py-12 md:py-20 noise-texture">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/30 font-mono text-sm font-bold text-primary">
                    <TrendingUp className="w-4 h-4" />
                    2+ BUILDERS ONLINE
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
                      <Link href="/mathathons">Submit Project</Link>
                    </Button>
                  </div>
                </div>

                {/*<div className="grid grid-cols-2 gap-4">*/}
                {/*  {[*/}
                {/*    { label: "Active Mathathons", value: "47", color: "primary" },*/}
                {/*    { label: "Total Projects", value: "12.4K", color: "secondary" },*/}
                {/*    { label: "Avg. Build Time", value: "8hrs", color: "accent" },*/}
                {/*    { label: "Prize Pool", value: "$5K", color: "primary" },*/}
                {/*  ].map((stat, i) => (*/}
                {/*      <Card key={i} className="border-2 border-border hover:border-primary/50 transition-colors accent-bar">*/}
                {/*        <CardHeader className="pb-2">*/}
                {/*          <CardDescription className="text-xs font-mono uppercase tracking-wider">*/}
                {/*            {stat.label}*/}
                {/*          </CardDescription>*/}
                {/*          <CardTitle className="text-4xl font-bold font-mono">{stat.value}</CardTitle>*/}
                {/*        </CardHeader>*/}
                {/*      </Card>*/}
                {/*  ))}*/}
                {/*</div>*/}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Active Mathathons", value: "0", sub: "Launching Soon" },
                    { label: "Total Projects", value: "0", sub: "First One Coming" },
                    { label: "Avg. Build Time", value: "-", sub: "TBD" },
                    { label: "Prize Pool", value: "$0", sub: "Opens at Launch" },
                  ].map((stat, i) => (
                      <Card key={i} className="border-2 border-border hover:border-primary/50 transition-colors accent-bar">
                        <CardHeader className="pb-2">
                          <CardDescription className="text-xs font-mono uppercase tracking-wider">
                            {stat.label}
                          </CardDescription>
                          <CardTitle className="text-4xl font-bold font-mono opacity-70">{stat.value}</CardTitle>
                          {stat.sub && (
                              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-mono mt-1">
                                {stat.sub}
                              </p>
                          )}
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
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Live + Upcoming Mathathons</h2>
                  <p className="text-lg text-muted-foreground font-mono">&#x2f;&#x2f; Pick your challenge</p>
                </div>
                <Button variant="ghost" asChild className="text-primary font-bold">
                  <Link href="/mathathons">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mathathons.map((mathathon, i) => (
                    <Card
                        key={i}
                        className="border-2 border-border hover:border-primary/50 transition-all group accent-bar"
                    >
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="font-mono font-bold border-2">
                            {mathathon.status}
                          </Badge>
                          <div className={`flex items-center gap-1 font-mono text-sm font-bold ${mathathon.status == "current" ? "text-primary" : "text-amber-400"}`}>
                            <Calendar className="w-4 h-4" />
                            {mathathon.daysLeft}d
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                          {mathathon.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">Build any project about {mathathon.status == "future" ? "a secret theme, that will be revealed when it starts" : mathathon.theme}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                            <Users className="w-4 h-4" />
                            <span className="font-bold">{mathathon.joins}</span>
                          </div>
                          <Button
                              size="sm"
                              asChild
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                          >
                            <Link href={`/mathathon/${mathathon._id}`}>Join →</Link>
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
                  &#x2f;&#x2f; Built different for math nerds who code
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group">
                  <div className="mb-6">
                    <div className="inline-flex w-16 h-16 bg-primary/10 border-2 border-primary/30 items-center justify-center">
                      <Code className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    Build Real Projects
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create websites, tools, and visualizations about math topics you love.
                  </p>
                </div>

                <div className="group">
                  <div className="mb-6">
                    <div className="inline-flex w-16 h-16 bg-secondary/10 border-2 border-secondary/30 items-center justify-center">
                      <Trophy className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Real Competition</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Compete against the best builders. Climb leaderboards. Earn respect.
                  </p>
                </div>

                <div className="group">
                  <div className="mb-6">
                    <div className="inline-flex w-16 h-16 bg-accent/10 border-2 border-accent/30 items-center justify-center">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Ship Fast</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Build. Submit. Get feedback. Learn from other projects.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
              <Card className="border-2 border-primary/30 bg-card/50 backdrop-blur accent-bar">
                <CardHeader className="text-center space-y-6 py-16">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to Build?</h2>
                  <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
                    &#x2f;&#x2f; Stop reading. Start building.
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