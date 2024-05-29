import ButtonResult from "@/components/button-result"
import Carrusel from "@/components/carrusel"
import SelectedCards from "@/components/selected-cards"
import { cards } from "@/lib/arrCards"

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <Carrusel cards={cards} />
            <SelectedCards cards={cards} />
            <div className="flex flex-row justify-center">
                <ButtonResult />
            </div>
        </main>
    )
}
