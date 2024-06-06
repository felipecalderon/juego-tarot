"use server"
import { Carta } from "./interfaces"

export const fetchPost = async (data: { question: string; name: string; born: string; cards: Carta[] }) => {
    const res = await fetch(`${process.env.BACK_URL}/api/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("No se pudo hacer el fetch")
    const respuesta = await res.json()
    return respuesta
}
