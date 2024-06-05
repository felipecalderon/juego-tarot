"use client"
import useCardStore from "@/stores/cardStore"
import { Button, Card, CardHeader, Image } from "@nextui-org/react"
import { cards } from "@/lib/arrCards"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { useRouter } from "next/navigation"
import { userStore } from "@/stores/userStore"

export default function SelectedCards() {
    const { flippedCards, limit } = useCardStore()
    const { question } = userStore()
    const consulta = question.replace(/[?¿]/g, "")
    const completed = flippedCards.size === limit
    const route = useRouter()
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))
    const handleAnalizar = async () => {
        if (!completed) return

        const [c1, c2, c3, c4, c5] = Array.from(flippedCards)
        route.push(`/resultado/${c1}/${c2}/${c3}/${c4}/${c5}`)
        // console.log(arrCards)
    }
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
                    <div className="fixed bottom-6 right-6">
                        <Button color="secondary" size="lg" onClick={handleAnalizar}>
                            Analizar la tirada <MdOutlineDoubleArrow />
                        </Button>
                    </div>
                )}
            </div>
        )
}
