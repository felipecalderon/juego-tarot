import { create } from "zustand"

interface CardState {
    flippedCards: Set<string>
    flipCard: (cardName: string) => void
    resetFlippedCards: () => void
    limit: number
    flippedTimes: number
    setFlippedTimes: () => void
}

const useCardStore = create<CardState>((set, get) => ({
    flippedCards: new Set(),
    limit: 5,
    flippedTimes: 0,
    setFlippedTimes: () => {
        const { flippedTimes } = get()
        set({ flippedTimes: flippedTimes + 1 })
    },
    flipCard: (cardName: string) => {
        const { flippedCards } = get()
        const newCards = flippedCards.add(cardName)
        set({ flippedCards: newCards })
    },
    resetFlippedCards: () => set({ flippedCards: new Set() }),
}))

export default useCardStore
