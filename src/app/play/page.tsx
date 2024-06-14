import DonationButton from "@/components/button-donation"
import ScrolledCards from "@/components/scrolled"
import SelectedCards from "@/components/selected-cards"
import { cards } from "@/lib/arrCards"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Selecciona las cartas",
    description: "Las cartas están ordenadas aleatoriamente para que una lectura apropiada, selecciona y obtén tu lectura.",
}

export default function PlayPage() {
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6 justify-between items-center">
            <div>
                <ScrolledCards cards={cards} />
                <SelectedCards />
            </div>
            <div className="max-w-2xl mb-16">
                <DonationButton />
            </div>
        </main>
    )
}
