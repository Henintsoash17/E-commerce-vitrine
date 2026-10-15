import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "ElecWave — Tech, sans compromis",
    description: "Boutique fictive d'informatique et d'électronique.",
};
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
