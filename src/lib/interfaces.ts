export interface Carta {
    nombre: string
    name: string
    categoria: string
    category: string
    representa: string[]
    img: string
}

export interface CartaJugada extends Carta {
    isReversed: boolean //la carta puede
}
export interface Juego {
    cartas: CartaJugada[] //array de cartas seleccionadas
}

export interface Consulta {
    id: string
    question: string
    answer: string
    name: string
    born: string
    cards: Carta[]
}
