"use client"
import Card from "@/components/card"
import useCardStore from "@/stores/cardStore"
import { ScrollShadow } from "@nextui-org/react"
import { Toaster, toast } from "sonner"
import { Carta } from "@/lib/interfaces"

export default function ScrolledCards({ cards }: { cards: Carta[] }) {
    const { flippedCards, flipCard, flippedTimes, setFlippedTimes, limit } = useCardStore()

    const handleFlip = (cardName: string) => {
        const isFlipped = flippedCards.has(cardName)
        if (flippedTimes < limit && !isFlipped) {
            setFlippedTimes()
            flipCard(cardName)
        } else if (isFlipped) {
            toast(`Carta "${cardName}" ya está escogida.`)
        } else {
            toast(`No puedes voltear más de ${limit} cartas.`)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Toaster position="bottom-center" />
            {limit - flippedTimes > 0 && (
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-3">Selecciona {limit - flippedTimes} cartas</h2>
                </div>
            )}
            <ScrollShadow className="h-[400px]">
                <div className="flex flex-row flex-wrap gap-3 justify-center">
                    {cards.map((card) => (
                        <Card
                            key={card.nombre}
                            carta={card}
                            isFlipped={flippedCards.has(card.nombre)}
                            handleFlip={() => handleFlip(card.nombre)}
                        />
                    ))}
                </div>
            </ScrollShadow>
        </div>
    )
}
