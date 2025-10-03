import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Outfit } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-mono",
    display: "swap",
})

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
})

export const metadata: Metadata = {
    title: "MathHacks - Mathathon Platform for Teen Math Enthusiasts",
    description:
        "Join exciting math challenges and competitions. Showcase your problem-solving skills and connect with fellow math enthusiasts.",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`dark ${spaceMono.variable} ${outfit.variable}`}>
        <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        </body>
        </html>
    )
}

