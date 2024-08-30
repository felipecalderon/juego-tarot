import dynamic from "next/dynamic"
const Payment = dynamic(() => import("@/components/payment"), { ssr: false })

export default function PagoPage() {
    return <Payment />
}
