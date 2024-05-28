"use client"
import { MouseEvent, useState } from "react"
import Carta from "@/components/card"
import useCardStore from "@/stores/cardStore"
import { Button, Pagination } from "@nextui-org/react"

interface Carta {
    nombre: string
    name: string
    categoria: string
    category: string
    representa: string[]
    img: string
}

export default function Carrusel({ cards }: { cards: Carta[] }) {
    const [currentPage, setCurrentPage] = useState(0)
    const { flippedCards, flipCard } = useCardStore()

    const cardsPerPage = 8
    const totalPages = Math.ceil(cards.length / cardsPerPage)

    const handleFlip = (cardName: string) => (e: MouseEvent<HTMLDivElement>) =>
        flipCard(cardName)

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }

    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
    }

    const getCurrentPageCards = () => {
        const startIndex = currentPage * cardsPerPage
        return cards.slice(startIndex, startIndex + cardsPerPage)
    }

    const filteredCards = getCurrentPageCards()
    return (
        <div className="relative w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 place-items-center gap-3">
                {filteredCards.map((card) => (
                    <Carta
                        key={card.nombre}
                        carta={card}
                        isFlipped={flippedCards.has(card.nombre)}
                        handleFlip={handleFlip(card.nombre)}
                    />
                ))}
            </div>
            <div className="flex justify-center gap-3 w-full mt-4">
                <Button onClick={handlePrev} color="secondary">
                    Prev
                </Button>
                <Pagination
                    loop
                    showControls
                    color="secondary"
                    total={totalPages}
                    onChange={setCurrentPage}
                    page={currentPage}
                    initialPage={0}
                />
                <Button onClick={handleNext} color="secondary">
                    Next
                </Button>
            </div>
        </div>
    )
}
