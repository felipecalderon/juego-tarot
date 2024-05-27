import Carta from "@/components/card"
import { cards } from "@/lib/arrCards"

const limitCards = cards.slice(0, 12)
export default function Home() {
    return (
        <main className="min-h-screen p-24">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 place-items-center gap-3">
                {limitCards.map((card, i) => (
                    <Carta key={i} carta={card} />
                ))}
            </div>
        </main>
    )
}
