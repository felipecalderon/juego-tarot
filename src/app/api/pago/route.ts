import { NextResponse, NextRequest } from "next/server"
interface ResponsePaypal {
    scope: string
    access_token: string
    token_type: string
    app_id: string
    expires_in: number
    nonce: string
}

interface PaypalLinks {
    href: string
    rel: "self" | "approve" | "update" | "capture"
    method: "GET" | "POST" | "PATCH"
}

interface PayPalResponseLink {
    id: string
    status: string
    links: PaypalLinks[]
}

interface StatusPayment {
    status?: "COMPLETED"
}

const base = "https://api-m.sandbox.paypal.com"
const { PAYPAL_APIKEY, PAYPAL_APISECRET } = process.env

export const GET = async (req: NextRequest) => {
    try {
        const access_token = await generateAccessToken()
        const url = `${base}/v2/checkout/orders`
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "2",
                    },
                },
            ],
        }

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only).
                // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        })

        const jsonResponse: PayPalResponseLink = await response.json()
        if (!jsonResponse.id) throw jsonResponse
        return NextResponse.json(jsonResponse)
    } catch (error) {
        return NextResponse.json({
            error: "No se pudo generar el link de pago",
        })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const { orderId } = await req.json()

        if (!orderId || typeof orderId !== "string") {
            return NextResponse.json({ error: "Invalid orderId" }, { status: 400 })
        }

        const statusPayment = await capturePayment(orderId)

        if (statusPayment.status === "COMPLETED") {
            // Aquí podrías agregar lógica para guardar la transacción en tu base de datos
            return NextResponse.json({ paid: true, data: statusPayment })
        } else if (statusPayment.status === "APPROVED") {
            return NextResponse.json({ paid: false, status: "APPROVED", message: "Payment approved but not captured" })
        } else {
            return NextResponse.json({ paid: false, status: statusPayment.status, message: "Payment not completed" })
        }
    } catch (error) {
        console.error("Error processing payment:", error)
        return NextResponse.json({ error: "An error occurred while processing the payment" }, { status: 500 })
    }
}

const capturePayment = async (orderId: string): Promise<{ status: string; details?: any }> => {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderId}`

    try {
        const orderResponse = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if (!orderResponse.ok) {
            throw new Error(`HTTP error! status: ${orderResponse.status}`)
        }

        const orderData = await orderResponse.json()

        if (orderData.status === "COMPLETED") {
            return { status: "COMPLETED", details: orderData }
        }

        if (orderData.status !== "APPROVED") {
            return { status: orderData.status, details: orderData }
        }

        // Intenta capturar el pago solo si está en estado APPROVED
        const captureUrl = `${url}/capture`
        const captureResponse = await fetch(captureUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!captureResponse.ok) {
            throw new Error(`HTTP error! status: ${captureResponse.status}`)
        }

        const captureData = await captureResponse.json()
        return { status: captureData.status, details: captureData }
    } catch (error) {
        console.error("Error in capturePayment:", error)
        throw error
    }
}

const generateAccessToken = async () => {
    const auth = Buffer.from(PAYPAL_APIKEY + ":" + PAYPAL_APISECRET).toString("base64")
    const getAuth = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    })
    const { access_token }: ResponsePaypal = await getAuth.json()
    return access_token
}
