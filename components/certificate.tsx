"use client"

import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

type CertificateProps = {
    participantName: string;
    hackathonTitle: string;
    prize?: string;
    date?: string;
};

export default function Certificate({ participantName, hackathonTitle, prize, date }: CertificateProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (ref.current) {
            const dataUrl = await toPng(ref.current);
            const link = document.createElement("a");
            link.download = `${participantName}_certificate.png`;
            link.href = dataUrl;
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <div
                ref={ref}
                className="w-[850px] h-[600px] bg-card border-4 border-primary/50 rounded-xl p-12 flex flex-col justify-center items-center text-center relative shadow-lg"
            >
                <div className="absolute top-6 left-6 text-3xl font-mono font-bold text-primary/50">
                    MathHacks
                </div>

                <h1 className="text-5xl font-bold text-primary mb-6 font-mono">
                    Certificate of {prize ? "Achievement" : "Participation"}
                </h1>

                <p className="text-xl text-muted-foreground mb-4 font-mono">
                    This is proudly presented to
                </p>

                <h2 className="text-4xl font-semibold mb-4">{participantName}</h2>

                {prize ? (
                    <p className="text-2xl text-secondary font-bold mb-2">
                        Winner of {prize}
                    </p>
                ) : (
                    <p className="text-2xl text-muted-foreground font-bold mb-2">
                        For participating
                    </p>
                )}

                <h3 className="text-3xl font-medium mb-6">{hackathonTitle}</h3>

                {date && (
                    <p className="text-sm text-muted-foreground font-mono absolute bottom-6">
                        {date}
                    </p>
                )}

                {/* Optional decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rotate-45 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rotate-12 blur-3xl" />
            </div>

            <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Download Certificate
            </Button>
        </div>
    );
}
