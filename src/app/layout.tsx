import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Juego de Tarot",
    description: "Creado por Felipe",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <div className="stars z-10"></div>
                <div className="twinkling z-20"></div>
                <div className="clouds z-30"></div>
                <div className="relative z-40">{children}</div>
            </body>
        </html>
    )
}
