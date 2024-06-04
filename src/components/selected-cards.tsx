"use client"
import useCardStore from "@/stores/cardStore"
import { Button, Card, CardHeader, Image } from "@nextui-org/react"
import { cards } from "@/lib/arrCards"
import { userStore } from "@/stores/userStore"
import { MdOutlineDoubleArrow } from "react-icons/md"

export default function SelectedCards() {
    const { flippedCards, limit } = useCardStore()
    // const { name, born, question } = userStore()
    const completed = flippedCards.size === limit
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))

    if (selectedCards.length > 0)
        return (
            <div className="pb-6">
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-3">Cartas escogidas</h2>
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
                        <Button color="secondary" size="lg">
                            Analizar la tirada <MdOutlineDoubleArrow />
                        </Button>
                    </div>
                )}
            </div>
        )
}
