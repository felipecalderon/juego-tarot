import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
import { GoogleTagManager } from "@next/third-parties/google"
import Script from "next/script"
const inter = Barlow({ weight: "400", preload: false })

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
    openGraph: {
        type: "website",
        description: "Descubre el misterio del tarot y predice tu destino con la lectura y selección única de cartas.",
        images: ["/img/rueda.png"],
        siteName: "Tarot gratis online",
        title: "Lectura de cartas gratis",
        url: "https://lecturatarot.vercel.app/",
    },
    alternates: {
        canonical: "https://lecturatarot.vercel.app/",
    },
    verification: {
        google: "fH4Tl3AdAV3JG6zqj7CMXOgfkWWhWLuDGeTgrzs5a3o",
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
                <GoogleTagManager gtmId="AW-328593452" />
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
