import Carrusel from "@/components/carrusel"
import SelectedCards from "@/components/selected-cards"
import { cards } from "@/lib/arrCards"

export default function Home() {
    return (
        <main className="min-h-screen px-24 py-10 flex flex-col gap-6">
            <Carrusel cards={cards} />
            <SelectedCards cards={cards} />
        </main>
    )
}
