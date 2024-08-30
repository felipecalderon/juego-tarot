import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PaymentLink {
    id: string
    status: string
    links: Array<{ href: string; rel: string; method: string }>
}

interface CaptureDetails {
    id: string
    status: string
    amount: {
        currency_code: string
        value: string
    }
    final_capture: boolean
    create_time: string
    update_time: string
}

interface UserDetails {
    name: {
        given_name: string
        surname: string
    }
    email_address: string
    payer_id: string
    address: {
        country_code: string
    }
}

interface PaymentState {
    paymentLink: PaymentLink | null
    captureDetails: CaptureDetails | null
    userDetails: UserDetails | null
    paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | null
    paymentDate: string | null
    setPaymentLink: (link: PaymentLink) => void
    setCaptureDetails: (details: CaptureDetails) => void
    setUserDetails: (details: UserDetails) => void
    setPaymentStatus: (status: "PENDING" | "COMPLETED" | "FAILED") => void
    resetPaymentState: () => void
}

export const usePaymentStore = create<PaymentState>()(
    persist(
        (set) => ({
            paymentLink: null,
            captureDetails: null,
            userDetails: null,
            paymentStatus: null,
            paymentDate: null,
            setPaymentLink: (link) => set({ paymentLink: link, paymentDate: new Date().toISOString() }),
            setCaptureDetails: (details) => set({ captureDetails: details }),
            setUserDetails: (details) => set({ userDetails: details }),
            setPaymentStatus: (status) => set({ paymentStatus: status, paymentDate: new Date().toISOString() }),
            resetPaymentState: () =>
                set({
                    paymentLink: null,
                    captureDetails: null,
                    userDetails: null,
                    paymentStatus: null,
                    paymentDate: null,
                }),
        }),
        {
            name: "payment-storage", // nombre para el almacenamiento persistente
            getStorage: () => localStorage, // usa localStorage para persistencia
        }
    )
)
