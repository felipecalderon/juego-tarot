"use client"
import useCardStore from "@/stores/cardStore"
import { Button, Card, CardHeader, Image } from "@nextui-org/react"
import { cards } from "@/lib/arrCards"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { userStore } from "@/stores/userStore"
import { fetchPost } from "@/lib/fetchPostGame"
import ModalTarot from "./modal"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SingleCardSelected from "./selected.card"
import { Toaster, toast } from "sonner"
import useSocket from "@/hooks/socketClient"

export default function SelectedCards() {
    const route = useRouter()
    const [response, setResponse] = useState({
        open: false,
        content: "",
    })
    const { isConnected, socket, transport } = useSocket()
    const [isLoading, setLoading] = useState(false)
    const { flippedCards, limit } = useCardStore()
    const { question, name, born } = userStore()
    const consulta = question.replace(/[?¿]/g, "")
    const completed = flippedCards.size === limit
    const selectedCards = cards.filter((card) => flippedCards.has(card.nombre))
    const handleAnalizar = async () => {
        setLoading(true)
        if (response.content) {
            setResponse({ ...response, open: true })
        } else {
            if (!completed) return
            const data = {
                question: question,
                name: name,
                born: born,
                cards: selectedCards,
            }
            if (isConnected) {
                socket.emit("data", data)
                socket.on("response", (res) => {
                    if (res.content) {
                        const { content } = res
                        setResponse({
                            open: true,
                            content: content,
                        })
                    }
                    setLoading(false)
                })
            }
        }
    }

    // useEffect(() => {
    //     if (!name || !born) {
    //         route.push("/")
    //     }
    // }, [])
    if (selectedCards.length > 0)
        return (
            <div className="pb-6">
                <Toaster position="top-center" />
                <div className="text-center text-white">
                    <h2 className="text-lg mb-1">Estas cartas te guiarán en tu consulta</h2>
                    <h4 className="text-2xl mb-3 italic text-yellow-300">¿{consulta}?</h4>
                </div>
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
                <ModalTarot isOpen={response.open} content={response.content} set={setResponse} />
            </div>
        )
}
