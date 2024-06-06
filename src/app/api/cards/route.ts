import { cards } from "@/lib/arrCards"
import { barajar } from "@/lib/barajarCartas"
import { Carta } from "@/lib/interfaces"
import { openai } from "@/lib/openai"
import { NextResponse, NextRequest } from "next/server"
type ReqProps = {
    question: string
    name: string
    born: string
    cards: Carta[]
}

export const GET = async (req: NextRequest) => {
    const cartasBarajadas = barajar(cards)
    return NextResponse.json(cartasBarajadas)
}

export const POST = async (req: NextRequest) => {
    const { question, name, born, cards }: ReqProps = await req.json()
    const chat = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content:
                    "Eres un experimentado tarotista, autodenominado GPTarot, sabes interpretar a la perfección las cartas, sobretodo del mazo Rider-Waite",
            },
            {
                role: "system",
                content:
                    "Vas a guiar al usuario e interpretar las cartas que le salgan, todo en base a la pregunta que tenga.",
            },
            {
                role: "user",
                content: `Hola mi nombre es ${name} nacido el ${born} (dd/mm/yyyy), mi consulta es: ${question}`,
            },
            {
                role: "system",
                content: `$${name}, las cartas que te han salido son: ${cards.map((cards, i) => {
                    return `${i + 1}: ${cards.nombre} (${cards.representa.map((r) => r + " ")}).`
                })}`,
            },
            {
                role: "system",
                content:
                    "Ahora te explicaré lo que significa cada carta en base a tu consulta y te daré un análisis final",
            },
        ],
    })
    const respuesta = chat.choices[0].message
    return NextResponse.json(respuesta)
}
