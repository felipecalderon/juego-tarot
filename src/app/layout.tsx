import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Lectura del tarot gratis",
    description: "Explora el misterio del tarot y descubre tu destino con la lectura de tarot y la selección única de cartas.",
    authors: [
        {
            name: "Felipe Calderón",
            url: "https://www.linkedin.com/in/felipecalderone/",
        },
    ],
    category: "Tarot",
    keywords: ["lectura", "cartas", "tarot"],
    publisher: "Vercel",
    icons: {
        icon: "/img/rueda.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                {/* Fondos animados por css */}
                <div className="estrellas z-10"></div>
                <div className="difuminado z-20"></div>
                <div className="nubes z-30"></div>
                <div className="nubes z-30"></div>
                {/* Contenido principal con los elementos children */}
                <main className="relative z-40">{children}</main>
            </body>
        </html>
    )
}
