import { Barlow } from "next/font/google"
import "./globals.css"
import sitemap from "@/lib/sitemap"
import { metadata } from "@/lib/metadata"

const inter = Barlow({ weight: "400", preload: false })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {/* Contenedor de fondos animados */}
                <div className="background-container">
                    <div className="estrellas z-10"></div>
                    <div className="difuminado z-20"></div>
                    <div className="nubes z-30"></div>
                    <div className="nubes z-30"></div>
                </div>
                {/* Contenido principal con los elementos children */}
                <main className="relative z-40">{children}</main>
            </body>
        </html>
    )
}
