"use client"
import { Carta } from "@/lib/interfaces"
import { Card, CardHeader, Image, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react"

export default function SingleCardSelected({ card }: { card: Carta }) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    return (
        <>
            <div onClick={onOpen} className="cursor-pointer">
                <Card className="min-w-72">
                    <CardHeader className="flex flex-row flex-wrap gap-3">
                        <Image alt={card.nombre} height={40} width={40} radius="none" src={`/img/cartas/${card.img}`} />
                        <div className="flex flex-col">
                            <p className="text-small text-default-500">{card.categoria}</p>
                            <p className="text-md">{card.nombre}</p>
                            <p className="text-xs italic max-w-40 md:max-w-60">
                                {card.representa.map((rep) => rep + " ")}
                            </p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="mx-auto">
                                <Image
                                    alt={card.nombre}
                                    height={700}
                                    width={350}
                                    radius="sm"
                                    src={`/img/cartas/${card.img}`}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
