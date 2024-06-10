"use client"
import useCardStore from "@/stores/cardStore"
import { Button } from "@nextui-org/react"
import { cards } from "@/lib/arrCards"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { userStore } from "@/stores/userStore"
import ModalTarot from "./modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SingleCardSelected from "./selected-card"
import { Toaster, toast } from "sonner"
import useSocket from "@/hooks/socketClient"

export default function SelectedCards() {
    const { socket } = useSocket("https://tarot-back-production.up.railway.app")
    const route = useRouter()
    const [openModal, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { flippedCards, limit } = useCardStore()
    const { question, name, born, setPlayed, response, setResponse, loadingStore, verifyPlayedToday } = userStore()
    const [q, setQ] = useState("")
    const [r, setR] = useState("")
    const completed = flippedCards.size === limit
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))
    const [played, setPlay] = useState(false)
    const handleAnalizar = async () => {
        setLoading(true)
        if (response) {
            setOpen(true)
            setLoading(false)
        } else {
            if (!completed) return
            const data = {
                question: question,
                name: name,
                born: born,
                cards: selectedCards,
            }
            if (socket && socket.connected) {
                socket.emit("data", data)
                setPlayed()
                socket.on("response", (res: any) => {
                    if (res.content) {
                        setResponse(res.content)
                        setOpen(true)
                    }
                    setLoading(false)
                })
            } else {
                toast("Error de conexión con servidor")
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if (!loadingStore) {
            if (verifyPlayedToday()) {
                setPlay(true)
            }
            if (!name || !born) {
                route.push("/")
            }
            if (question) {
                setQ(question.replace(/[?¿]/g, ""))
            }
            if (response) {
                setR(response)
            }
        }
    }, [loadingStore])
    if (loadingStore)
        return (
            <div className="flex flex-row justify-center">
                <Button isLoading variant="ghost" className="text-white">
                    Recuperando datos...
                </Button>
            </div>
        )
    else
        return (
            <div className="pb-6">
                <Toaster position="top-center" />
                <div className="text-center text-white">
                    <h2 className="text-lg mb-1">Las cartas te guiarán en tu consulta</h2>
                    <h4 className="text-2xl mb-3 italic text-yellow-300">¿{q}?</h4>
                </div>
                {!played ? (
                    <>
                        <div className="flex flex-row flex-wrap justify-center mx-auto gap-3">
                            {selectedCards.map((card) => (
                                <SingleCardSelected key={card.name} card={card} />
                            ))}
                        </div>
                        {completed && (
                            <div className="fixed bottom-6 right-2 md:right-6 z-50">
                                <Button
                                    color="secondary"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                    size="lg"
                                    onClick={handleAnalizar}
                                >
                                    {isLoading ? "Interpretando las cartas.. paciencia" : "Obtener lectura del tarot"}
                                    <MdOutlineDoubleArrow />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-white italic">
                        <p className="mb-6">Ya has jugado hoy, puedes ver tu lectura del día haciendo clic aquí:</p>
                        <Button
                            color="secondary"
                            isLoading={isLoading}
                            disabled={isLoading}
                            size="lg"
                            onClick={handleAnalizar}
                        >
                            {isLoading ? "Interpretando.." : "Leer predicción"}
                            <MdOutlineDoubleArrow />
                        </Button>
                        <p className="mt-3 italic">¡Vuelve mañana para una nueva consulta y predicción!</p>
                    </div>
                )}
                <ModalTarot isOpen={openModal} content={r} set={setOpen} />
            </div>
        )
}
