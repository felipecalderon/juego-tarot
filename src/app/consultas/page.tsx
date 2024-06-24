import Consultastabla from "@/components/tables/consultas-tabla"
import React from "react"
const back_url = process.env.BACK_URL

export default async function ConsultasPage() {
    const fetchdata = await fetch(`${back_url}consultas`)
    const consultas = await fetchdata.json()
    return (
        <section className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <h1 className="text-3xl md:text-6xl text-yellow-300 font-bold text-center text-nowrap">Base de consultas pública</h1>
            <h2 className="text-2xl md:text-3xl text-white text-center text-nowrap">Transparencia de la información</h2>
            <Consultastabla consultas={consultas} />
        </section>
    )
}
