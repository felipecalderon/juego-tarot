import { userStore } from "@/stores/userStore"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import Markdown from "markdown-to-jsx"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
    isOpen: boolean
    content: string
    set: Dispatch<SetStateAction<boolean>>
}
export default function ModalTarot({ isOpen, content, set }: Props) {
    const { verifyPlayedToday } = userStore()
    const [isPlayed, setPlayed] = useState(false)

    useEffect(() => {
        const jugoHoy = verifyPlayedToday()
        if (jugoHoy) {
            setPlayed(jugoHoy)
        }
    }, [])
    return (
        <Modal
            placement="center"
            isOpen={isOpen}
            size="4xl"
            scrollBehavior="inside"
            onClose={() => set(false)}
            onOpenChange={() => set(!isOpen)}
        >
            <ModalContent className="px-6 py-3">
                {(onClose) => (
                    <>
                        <ModalHeader>Resultado de la tirada</ModalHeader>
                        <ModalBody>
                            {isPlayed && (
                                <p className="bg-red-300 px-3 py-4 italic">
                                    Ya has jugado hoy, esta fue tu lectura del día:
                                </p>
                            )}
                            <Markdown>{content}</Markdown>
                            <p className="italic">
                                Espero que esta lectura aclare tu camino, te deseo un excelente destino!<br></br>¡Vuelve
                                mañana!
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
