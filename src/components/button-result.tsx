"use client"

import useCardStore from "@/stores/cardStore"
import { Button } from "@nextui-org/react"

export default function ButtonResult() {
    const { limit, flippedTimes } = useCardStore()
    if (flippedTimes === limit)
        return (
            <Button color="secondary" className="mb-9 sm:mb-1">
                Obtener lectura del Tarot
            </Button>
        )
}
