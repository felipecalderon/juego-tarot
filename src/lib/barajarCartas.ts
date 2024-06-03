import { Carta } from "./interfaces"
import { getRandomNumber } from "./randomized"

export const barajar = (array: Carta[]) => {
    const fecha = new Date().getTime()
    return array
        .map((cards) => ({ sort: getRandomNumber(fecha), cards: cards }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.cards)
}
