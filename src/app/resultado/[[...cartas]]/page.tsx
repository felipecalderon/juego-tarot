import { cards } from "@/lib/arrCards"

export default function CartasPage({ params }: { params: { cartas: string[] } }) {
    const stringCartas = params.cartas.map((s) => {
        const nombre = decodeURIComponent(s)
        const findCard = cards.find((c) => c.nombre === nombre)
        return findCard
    })

    console.log(stringCartas)
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6 text-center">
            <p className="text-white">Cartaaas</p>
        </main>
    )
}
