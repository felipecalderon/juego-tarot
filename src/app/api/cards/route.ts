import { cards } from "@/lib/arrCards"
import { barajar } from "@/lib/barajarCartas"
import { openai } from "@/lib/openai"
import { NextResponse, NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const cartasBarajadas = barajar(cards)
    return NextResponse.json(cartasBarajadas)
}

export const POST = async (req: NextRequest) => {
    const body = await req.json()
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
                    "Al usuario le han salido las cartas: El Colgado, Rey de Oros, Sota de Copas, El Diablo, Cinco de Bastos",
            },
            {
                role: "system",
                content:
                    "El usuario quiere verse el destino, su consulta es: ¿Resultará exitosa la inversión monetaria mañana?",
            },
            { role: "user", content: body.content },
        ],
    })
    const respuesta = chat.choices[0].message
    return NextResponse.json(respuesta)
}
