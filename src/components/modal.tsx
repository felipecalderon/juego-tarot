import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import Markdown from "markdown-to-jsx"
import { Dispatch, SetStateAction } from "react"

type Props = {
    isOpen: boolean
    content: string
    set: Dispatch<SetStateAction<{ open: boolean; content: string }>>
}
export default function ModalTarot({ isOpen, content, set }: Props) {
    return (
        <Modal
            placement="center"
            isOpen={isOpen}
            size="4xl"
            scrollBehavior="inside"
            onClose={() => set({ open: false, content: content })}
            onOpenChange={() => set({ open: false, content: content })}
        >
            <ModalContent className="px-6 py-3">
                {(onClose) => (
                    <>
                        <ModalHeader>Resultado de la tirada</ModalHeader>
                        <ModalBody>
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
