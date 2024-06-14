import Cuestionario from "@/components/forms/cuestionario"
import { Image } from "@nextui-org/react"

export default function Home() {
    return (
        <section className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <h1 className="text-3xl md:text-6xl text-yellow-300 font-bold text-center text-nowrap">Lectura del tarot online</h1>
            <h2 className="text-2xl md:text-3xl md:mb-4 text-white text-center text-nowrap">Descubre tu Destino</h2>
            <div className="flex flex-col md:flex-row gap-3 justify-center z-50">
                <div className="w-full md:w-1/2 text-white flex flex-col gap-6 text-pretty text-center md:text-left">
                    <p className="text-xl md:text-2xl italic">
                        "Las cartas del tarot pueden revelar los misterios ocultos del universo y guiarte en tu camino"
                    </p>
                    <p className="text-xl font-semibold text-yellow-200">
                        ¿Te gustaría conocer tu futuro? <br></br>¿Tienes preguntas sin responder?
                    </p>
                    <p className="text-lg md:text-xl pr-6">
                        La lectura del tarot es gratis y utiliza el mazo de cartas <b>Rider-Waite</b> para ofrecerte una experiencia{" "}
                        <b>única</b>, <b>mística</b> y <b>reveladora</b>. Escoge una cantidad de cartas y déjate guiar por el destino.
                    </p>
                    <p className="text-lg md:text-xl pr-6">
                        Prepárate para una lectura de cartas que podría cambiar tu perspectiva y brindarte respuestas a las preguntas más
                        profundas de tu vida.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <p className="text-lg md:text-xl text-white italic">Para iniciar la lectura de cartas necesitas ingresar tus datos</p>
                    <Cuestionario />
                </div>
            </div>
            <Image
                src="/img/rueda.png"
                className="animate-spin-ultraslow fixed pointer-events-none -bottom-72 md:-bottom-96 z-10 right-0"
                alt="Ruleta de la suerte"
            />
        </section>
    )
}
