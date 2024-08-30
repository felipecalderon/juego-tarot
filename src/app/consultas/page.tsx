import Consultastabla from "@/components/tables/consultas-tabla"
import ConsultasTop from "@/components/tables/consultas-tops"
import { Consulta } from "@/lib/interfaces"
import React from "react"
const back_url = process.env.NEXT_PUBLIC_BACK_URL
interface RespBack {
    page: number
    pageSize: number
    total: number
    tops: {
        name: string
        count: number
    }[]
    data: Consulta[]
}
export default async function ConsultasPage() {
    const res = await fetch(`${back_url}consultas`, {
        cache: "no-store",
    })
    if (res.ok) {
        const consultas: RespBack = await res.json()
        if (consultas && consultas.data.length > 0)
            return (
                <section className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
                    <h1 className="text-3xl md:text-6xl text-yellow-300 font-bold text-center text-nowrap">Base de consultas</h1>
                    <h2 className="text-2xl md:text-3xl text-white text-center text-nowrap">Transparencia de la información</h2>
                    <Consultastabla consultas={consultas} />
                    <ConsultasTop tops={consultas.tops} />
                </section>
            )
    } else {
        console.log(res)
    }
}
