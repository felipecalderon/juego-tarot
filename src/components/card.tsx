"use client"
import React, { useState } from "react"
import { Card, CardFooter, Image, Button } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function Carta({
    name,
    category,
}: {
    name: string
    category: string
}) {
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
                transition={{ duration: 0.6 }}
                style={{
                    transformStyle: "preserve-3d",
                    height: sizes.h,
                    width: sizes.w,
                }}
            >
                <Card
                    isFooterBlurred
                    radius="lg"
                    className={`card-face h-[${sizes.h}px] w-[${sizes.w}px]`}
                >
                    <Image
                        alt="Celestial pattern"
                        className={`object-cover h-[${sizes.h}px]`}
                        src="https://static.vecteezy.com/system/resources/previews/004/104/746/original/celestial-tarot-astrological-golden-seamless-pattern-on-dark-background-vector.jpg"
                    />
                </Card>
                <Card
                    isFooterBlurred
                    radius="lg"
                    className={`card-face card-back h-[${sizes.h}px] w-[${sizes.w}px]`}
                >
                    <Image
                        alt="Hero card"
                        className={`object-cover h-[${sizes.h}px]`}
                        src="https://nextui.org/images/hero-card.jpeg"
                    />
                    <CardFooter className="justify-center before:bg-white/10 border-white/20 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
                        <p className="text-xs text-white/80">{name}</p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}
