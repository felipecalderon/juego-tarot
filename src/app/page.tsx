import Cuestionario from "@/components/forms/cuestionario"

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300 drop-shadow-md">
                Descubre tu Destino
            </h1>
            <div className="flex flex-col md:flex-row gap-3 justify-center">
                <div className="w-full md:w-1/2 text-white ">
                    <p className="text-xl md:text-2xl mb-8 italic">
                        "Las cartas del tarot pueden revelar los misterios ocultos del universo y
                        guiarte en tu camino"
                    </p>
                    <p className="text-xl font-semibold text-yellow-200">
                        ¿Te gustaría conocer tu futuro? ¿tienes preguntas sin responder?
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                        <p className="text-lg md:text-xl">
                            El presente juego utiliza el mazo de cartas Rider-Waite para ofrecerte
                            una experiencia única, mística y reveladora. Escoge una cantidad de
                            cartas y déjate guiar por el destino.
                        </p>
                        <p className="text-lg md:text-xl md:text-right">
                            Prepárate para una lectura que podría cambiar tu perspectiva y brindarte
                            respuestas a las preguntas más profundas de tu vida.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <p className="text-lg md:text-xl text-white italic">
                        Para comenzar a jugar necesitas ingresar tus datos
                    </p>
                    <Cuestionario />
                </div>
            </div>
        </main>
    )
}
