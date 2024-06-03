"use client"
import React, { MouseEvent, useEffect, useState } from "react"
import { Card, CardFooter, Image, Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { Carta } from "@/lib/interfaces"
import useMobile from "@/hooks/detectedMobile"

export default function CartaComponent({
    carta,
    isFlipped,
    handleFlip,
}: {
    carta: Carta
    isFlipped?: boolean
    handleFlip?: (e: MouseEvent<HTMLDivElement>) => void
}) {
    const { isMobile } = useMobile()
    const [sizes, setSizes] = useState({
        h: 250,
        w: 140,
    })

    useEffect(() => {
        setSizes({
            h: isMobile ? 150 : 250,
            w: isMobile ? 100 : 140,
        })
    }, [isMobile])

    return (
        <div className="card-container hover:scale-105 transition-all" onClick={handleFlip}>
            <motion.div
                className="card shadow-xl"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    transformStyle: "preserve-3d",
                    height: sizes.h,
                    width: sizes.w,
                }}
            >
                <Card
                    isFooterBlurred
                    radius="lg"
                    style={{
                        height: sizes.h,
                        width: sizes.w,
                    }}
                    className={`card-face`}
                >
                    <Image
                        alt="Carta reverso"
                        className={`object-cover h-[300px] w-full`}
                        src="/img/fondo-carta.jpg"
                    />
                </Card>
                <Card
                    isFooterBlurred
                    radius="lg"
                    style={{
                        height: sizes.h,
                        width: sizes.w,
                    }}
                    className={`card-back ${!isFlipped ? "hidden" : "block"}`}
                >
                    <Image
                        alt="Carta de frente"
                        className={`object-cover scale-110 object-center h-[300px]`}
                        src={`/img/cartas/${carta.img}`}
                    />
                    <CardFooter className="justify-center before:bg-white/10 border-white/20 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
                        <p className="text-xs text-white/80">{carta.nombre}</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
