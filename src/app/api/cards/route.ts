import { cards } from "@/lib/arrCards"
import { barajar } from "@/lib/barajarCartas"
import { NextResponse, NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    // const params = req.nextUrl.searchParams.get("shuffle")
    // const random = JSON.parse(params || "[]")

    const cartasBarajadas = barajar(cards)
    return NextResponse.json(cartasBarajadas)
}
