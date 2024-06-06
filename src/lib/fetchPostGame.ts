"use server"
import { Carta } from "./interfaces"
import { openai } from "./openai"

export const fetchPost = async (data: { question: string; name: string; born: string; cards: Carta[] }) => {
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
                content: `Hola mi nombre es ${data.name} nacido el ${data.born} (dd/mm/yyyy), mi consulta es: ${data.question}`,
            },
            {
                role: "system",
                content: `$${data.name}, las cartas que te han salido son: ${data.cards.map((cards, i) => {
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
    return respuesta
}
