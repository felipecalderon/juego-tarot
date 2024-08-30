"use client"
import { Listbox, ListboxItem } from "@nextui-org/react"

interface Tops {
    name: string
    count: number
}

export default function ConsultasTop({ tops }: { tops: Tops[] }) {
    return (
        <div className="text-white mx-auto">
            <p>Top de consultas</p>
            {tops.map((top) => (
                <Listbox key={top.name}>
                    <ListboxItem endContent={<button>{top.count}</button>} key={top.name}>
                        {top.name}
                    </ListboxItem>
                </Listbox>
            ))}
        </div>
    )
}
