"use client"
import { useEffect, useState } from "react"
import Card from "@/components/card"
import useCardStore from "@/stores/cardStore"
import { Pagination } from "@nextui-org/react"
import { Toaster, toast } from "sonner"
import { Carta } from "@/lib/interfaces"
import useMobile from "@/hooks/detectedMobile"
import { barajar } from "@/lib/barajarCartas"

export default function Carrusel({ cards }: { cards: Carta[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [shuffledCards, setShuffledCards] = useState<Carta[]>([])
    const { isMobile } = useMobile()
    const { flippedCards, flipCard, flippedTimes, setFlippedTimes, limit } = useCardStore()

    useEffect(() => {
        setShuffledCards(barajar(cards))
    }, [cards])

    const cardsPerPage = !isMobile ? 8 : 6
    const totalPages = Math.ceil(shuffledCards.length / cardsPerPage)

    const handleFlip = (cardName: string) => {
        const isFlipped = flippedCards.has(cardName)
        if (flippedTimes < limit && !isFlipped) {
            setFlippedTimes()
            flipCard(cardName)
        } else if (isFlipped) {
            toast(`${cardName} ya está elegida`)
        } else {
            toast(`No puedes voltear más de ${limit} cartas`)
        }
    }

    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * cardsPerPage
        return shuffledCards.slice(startIndex, startIndex + cardsPerPage)
    }

    const filteredCards = getCurrentPageCards()

    return (
        <div className="flex flex-col items-center justify-center">
            <Toaster position="bottom-center" />
            {limit - flippedTimes > 0 && (
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-3">Selecciona {limit - flippedTimes} cartas</h2>
                </div>
            )}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 place-items-center gap-2">
                {filteredCards.map((card) => (
                    <Card
                        key={card.nombre}
                        carta={card}
                        isFlipped={flippedCards.has(card.nombre)}
                        handleFlip={() => handleFlip(card.nombre)}
                    />
                ))}
            </div>
            <div className="flex justify-center gap-3 mt-6">
                <Pagination
                    loop
                    color="secondary"
                    showControls
                    total={totalPages}
                    onChange={setCurrentPage}
                    page={currentPage}
                    initialPage={1}
                />
            </div>
        </div>
    )
}
