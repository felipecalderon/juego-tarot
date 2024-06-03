import { randomBytes } from "crypto"

export const getRandomNumber = (max: number): number => {
    // esta fn reemplaza al clasico math random y le dá mas realismo
    const randomBuffer = randomBytes(4)
    const randomNumber = randomBuffer.readUInt32BE(0) / 0xffffffff
    return randomNumber * max
}
