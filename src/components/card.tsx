"use client"
import React, { useState } from "react"
import { Card, CardFooter, Image, Button } from "@nextui-org/react"
import { motion } from "framer-motion"
interface Card {
    nombre: string
    name: string
    categoria: string
    category: string
    representa: string[]
    img: string
}
export default function Carta({ carta }: { carta: Card }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [sizes, _setSizes] = useState({
        h: 250,
        w: 150,
    })
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="card-container" onClick={handleFlip}>
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
                    style={{ height: sizes.h, width: sizes.w }}
                    className={`card-face`}
                >
                    <Image
                        alt="Carta reverso"
                        className={`object-cover h-[300px] w-full`}
                        src="https://static.vecteezy.com/system/resources/previews/004/104/746/original/celestial-tarot-astrological-golden-seamless-pattern-on-dark-background-vector.jpg"
                    />
                </Card>
                <Card
                    isFooterBlurred
                    radius="lg"
                    style={{ height: sizes.h, width: sizes.w }}
                    className={`card-back`}
                >
                    <Image
                        alt="Carta de frente"
                        className={`object-cover h-[300px]`}
                        src={`/img/cartas/${carta.img}`}
                    />
                    <CardFooter className="justify-center before:bg-white/10 border-white/20 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
                        <p className="text-xs text-white/80">{carta.name}</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
