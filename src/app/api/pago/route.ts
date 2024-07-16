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
    const { orderId } = await req.json()
    const statusPayment = await capturePayment(orderId)
    if (statusPayment.status) {
        return NextResponse.json({ PAGADO: true, data: statusPayment })
    }
    return NextResponse.json({ PAGADO: false, data: statusPayment })
}

const capturePayment = async (orderId: string) => {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderId}`

    // Verificar el estado de la orden
    const orderResponse = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const orderData = await orderResponse.json()
    if (orderData.status === "COMPLETED") {
        return { status: "COMPLETED" }
    }

    // Capturar el pago
    const captureUrl = `${base}/v2/checkout/orders/${orderId}/capture`
    const response = await fetch(captureUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    })

    const jsonResponse: StatusPayment = await response.json()
    return jsonResponse
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
