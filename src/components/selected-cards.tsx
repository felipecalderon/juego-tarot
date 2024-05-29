"use client"
import { Carta } from "@/lib/interfaces"
import useCardStore from "@/stores/cardStore"
import Card from "@/components/card"

export default function SelectedCards({ cards }: { cards: Carta[] }) {
    const { flippedCards } = useCardStore()
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))

    if (selectedCards.length > 0)
        return (
            <div>
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-3">Cartas escogidas</h2>
                </div>
                <div className="flex flex-row justify-center mx-auto gap-3 max-w-fit">
                    {selectedCards.map((card, i) => (
                        <Card key={i} carta={card} isFlipped={true} />
                    ))}
                </div>
            </div>
        )
}
