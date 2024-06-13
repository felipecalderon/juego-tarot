"use client"
import { Button } from "@nextui-org/react"
import Link from "next/link"
// https://buymeacoffee.com/felipecalderon

export default function DonationButton() {
    const clickButton = () => {
        if (window) {
            const isMobile = window.innerWidth <= 800 && window.innerHeight <= 600
            const width = isMobile ? window.innerWidth : 1100
            const height = isMobile ? window.innerHeight : 700
            const left = (screen.width - width) / 2
            const top = (screen.height - height) / 2
            window.open(
                "https://www.buymeacoffee.com/felipecalderon",
                "donar",
                `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
            )
        }
    }
    return (
        <>
            <div className="p-6 bg-violet-100 rounded-md flex flex-col md:flex-row gap-3 justify-center">
                <p className="text-sm text-pretty text-center">
                    Este proyecto es 100% gratis, <strong>mantengámos vivo el espítiru cabalístico </strong>
                    con una pequeña donación y así ayudas a mantener vivo este hermoso proyecto.
                    <span className="block text-xs mt-1 italic font-semibold cursor-pointer text-violet-900">
                        <Link href="https://www.linkedin.com/in/felipecalderone/" target="_blank">
                            Atte: Felipe Calderón - Creative Webmaster
                        </Link>
                    </span>
                </p>
                <Button className="w-fit mx-auto sm:mx-0" color="secondary" variant="ghost" onClick={clickButton}>
                    Donar
                </Button>
            </div>
        </>
    )
}
