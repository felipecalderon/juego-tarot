"use client"
import useCardStore from "@/stores/cardStore"
import { Button, Card, CardHeader, Image } from "@nextui-org/react"
import { cards } from "@/lib/arrCards"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { userStore } from "@/stores/userStore"
import { fetchPost } from "@/lib/fetchPostGame"
import ModalTarot from "./modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SelectedCards() {
    const route = useRouter()
    const [response, setResponse] = useState({
        open: false,
        content: "",
    })
    const [isLoading, setLoading] = useState(false)
    const { flippedCards, limit } = useCardStore()
    const { question, name, born } = userStore()
    const consulta = question.replace(/[?¿]/g, "")
    const completed = flippedCards.size === limit
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))
    const handleAnalizar = async () => {
        setLoading(true)
        if (response.content) {
            setResponse({ ...response, open: true })
        } else {
            if (!completed) return
            const data = {
                question: question,
                name: name,
                born: born,
                cards: selectedCards,
            }
            const { content } = await fetchPost(data)
            if (content) {
                setResponse({
                    open: true,
                    content: content,
                })
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!name || !born) {
            route.push("/")
        }
    }, [])
    if (selectedCards.length > 0)
        return (
            <div className="pb-6">
                <div className="text-center text-white">
                    <h2 className="text-lg mb-1">Estas cartas te guiarán en tu consulta</h2>
                    <h4 className="text-2xl mb-3 italic text-yellow-300">¿{consulta}?</h4>
                </div>
                <div className="flex flex-row flex-wrap justify-center mx-auto gap-3">
                    {selectedCards.map((card, i) => (
                        <Card key={card.name} className="min-w-60">
                            <CardHeader className="flex flex-row flex-wrap gap-3">
                                <Image
                                    alt={card.nombre}
                                    height={40}
                                    width={40}
                                    radius="none"
                                    src={`/img/cartas/${card.img}`}
                                />
                                <div className="flex flex-col">
                                    <p className="text-small text-default-500">Tipo: {card.categoria}</p>
                                    <p className="text-md">{card.nombre}</p>
                                    <p className="text-xs italic">{card.representa.map((rep) => rep + " ")}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                {completed && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <Button
                            color="secondary"
                            isLoading={isLoading}
                            disabled={isLoading}
                            size="lg"
                            onClick={handleAnalizar}
                        >
                            Analizar la tirada <MdOutlineDoubleArrow />
                        </Button>
                    </div>
                )}
                <ModalTarot isOpen={response.open} content={response.content} set={setResponse} />
            </div>
        )
}
