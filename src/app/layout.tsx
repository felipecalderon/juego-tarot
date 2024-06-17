import type { Metadata, MetadataRoute } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
const inter = Barlow({ weight: "400", preload: false })

export function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://lecturatarot.vercel.app/",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://lecturatarot.vercel.app/play/",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ]
}

export const metadata: Metadata = {
    title: "Lectura del tarot gratis",
    description: "Explora el misterio del tarot y descubre tu destino con la lectura y selección única de cartas.",
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
    manifest: "manifest.json",
}

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
