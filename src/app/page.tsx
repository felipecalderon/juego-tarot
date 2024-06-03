import ButtonResult from "@/components/button-result"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-3 md:px-24 md:py-10 flex flex-col gap-6">
            <div className="mx-auto">
                <Link href={"/play"}>
                    <Button>Ver el horóscopo</Button>
                </Link>
                <ButtonResult />
            </div>
        </main>
    )
}
