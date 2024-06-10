import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
    name: string
    born: string
    question: string
    response: string
    loadingStore: boolean
    setUser: ({ name, born, question }: UserData) => void
    lastPlayed: CalendarDate | undefined
    setLoading: (value: boolean) => void
    setPlayed: () => void
    setResponse: (response: string) => void
    verifyPlayedToday: () => boolean
}

interface UserData {
    name: string
    born: string
    question?: string
    response?: string
}

export const userStore = create(
    persist<UserStore>(
        (set, get) => ({
            loadingStore: true,
            name: "",
            born: "",
            question: "",
            response: "",
            lastPlayed: undefined,
            setLoading: (value) => {
                set({ loadingStore: value })
            },
            setResponse: (response) => set({ response }),
            setUser: ({ name, born, question }) => set({ name, born, question: question ? question : "" }),
            setPlayed: () => set({ lastPlayed: today(getLocalTimeZone()) }),
            verifyPlayedToday: () => {
                const { lastPlayed } = get()
                if (lastPlayed) {
                    const { day, month, year } = lastPlayed
                    const { day: tDay, month: tMonth, year: tYear } = today(getLocalTimeZone())
                    return day === tDay && month === tMonth && year === tYear
                }
                return false
            },
        }),
        {
            name: "userStoreLocal",
            onRehydrateStorage: () => (state) => state && state.setLoading(false),
        }
    )
)
