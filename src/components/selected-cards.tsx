"use client"
import { Carta } from "@/lib/interfaces"
import useCardStore from "@/stores/cardStore"
import { Card, CardHeader, Image } from "@nextui-org/react"

export default function SelectedCards({ cards }: { cards: Carta[] }) {
    const { flippedCards } = useCardStore()
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))

    if (selectedCards.length > 0)
        return (
            <div>
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
                                    <p className="text-small text-default-500">
                                        Tipo: {card.categoria}
                                    </p>
                                    <p className="text-md">{card.nombre}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        )
}