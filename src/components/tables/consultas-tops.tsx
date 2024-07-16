"use client"
import { Consulta } from "@/lib/interfaces"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { useEffect, useState } from "react"

interface Tops {
    nombre: string
    consultas: number
}

export default function ConsultasTop({ consultas }: { consultas: Consulta[] }) {
    const [tops, setTops] = useState<Tops[]>([])
    useEffect(() => {
        const top = consultas.reduce((acc, consulta) => {
            const getConsulta = acc.find((q) => q.nombre === consulta.name)
            if (!getConsulta) {
                return [...acc, { nombre: consulta.name, consultas: 1 }]
            } else {
                return acc.map((q) => {
                    if (q.nombre === consulta.name) {
                        return { nombre: consulta.name, consultas: q.consultas + 1 }
                    } else {
                        return q
                    }
                })
            }
        }, [] as Tops[])
        setTops(top.filter((q) => q.consultas > 3).sort((a, s) => s.consultas - a.consultas))
    }, [])

    return (
        <div className="text-white mx-auto">
            <p>Top de consultas</p>
            {tops.map((top) => (
                <Listbox key={top.nombre}>
                    <ListboxItem endContent={<button>{top.consultas}</button>} key={top.nombre}>
                        {top.nombre}
                    </ListboxItem>
                </Listbox>
            ))}
        </div>
    )
}
