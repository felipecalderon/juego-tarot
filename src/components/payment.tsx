"use client"
import { usePaymentStore } from "@/stores/paymentStore"
import Link from "next/link"
import { useEffect } from "react"
// En tu componente
export default function PaymentComponent() {
    const {
        paymentLink,
        captureDetails,
        userDetails,
        paymentStatus,
        paymentDate,
        setPaymentLink,
        setCaptureDetails,
        setUserDetails,
        setPaymentStatus,
    } = usePaymentStore()

    // Generar link de pago
    const generatePaymentLink = async () => {
        const response = await fetch("/api/pago")
        if (response.ok) {
            const data = await response.json()
            setPaymentLink(data)
        }
    }

    // Capturar pago
    const capturePayment = async (orderId: string) => {
        const response = await fetch("/api/pago", {
            method: "POST",
            body: JSON.stringify({ orderId }),
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            if (data.paid) {
                setCaptureDetails(data.data.details)
                setUserDetails(data.data.details.payer)
                setPaymentStatus(data.data.status)
            }
        }
    }

    const findedLink = paymentLink && paymentLink.links.find((link) => link.rel === "approve")

    useEffect(() => {
        if (paymentLink) {
            capturePayment(paymentLink.id)
        } else {
            generatePaymentLink()
        }
    }, [])

    return (
        <div className="text-white">
            {paymentLink && findedLink && paymentStatus !== "COMPLETED" && (
                <Link href={findedLink.href} target="_blank">
                    Pagar
                </Link>
            )}
            {paymentStatus && <p>Estado del pago: {paymentStatus}</p>}
            {paymentDate && <p>Última revisión: {new Date(paymentDate).toLocaleString()}</p>}
            {userDetails && (
                <div>
                    <ul>
                        <li>
                            Nombre: {userDetails.name.given_name} {userDetails.name.surname}
                        </li>
                        <li>Correo: {userDetails.email_address}</li>
                        <li>Localidad: {userDetails.address.country_code}</li>
                    </ul>
                </div>
            )}
        </div>
    )
}
