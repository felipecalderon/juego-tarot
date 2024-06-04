export default function CartasPage({ params }: { params: { cartas: string } }) {
    console.log(params.cartas)
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6 text-center">
            <p className="text-white">Cartaaas</p>
        </main>
    )
}
