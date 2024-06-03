import ScrolledCards from "@/components/scrolled"
import SelectedCards from "@/components/selected-cards"
import { cards } from "@/lib/arrCards"

export default function PlayPage() {
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <ScrolledCards cards={cards} />
            <SelectedCards />
        </main>
    )
}
