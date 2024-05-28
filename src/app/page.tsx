import Carrusel from "@/components/carrusel"
import { cards } from "@/lib/arrCards"

export default function Home() {
    return (
        <main className="min-h-screen p-24">
            <Carrusel cards={cards} />
        </main>
    )
}
