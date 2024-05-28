import { create } from "zustand"

interface CardState {
    flippedCards: Set<string>
    flipCard: (cardName: string) => void
    resetFlippedCards: () => void
}

const useCardStore = create<CardState>((set, get) => ({
    flippedCards: new Set(),
    flipCard: (cardName: string) => {
        const { flippedCards } = get()
        const newCards = flippedCards.add(cardName)
        set({ flippedCards: newCards })
    },
    resetFlippedCards: () => set({ flippedCards: new Set() }),
}))

export default useCardStore
