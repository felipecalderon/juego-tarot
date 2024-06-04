import { create } from "zustand"

interface UserStore {
    name: string
    born: string
    question: string
    setUser: ({ name, born, question }: UserData) => void
}

interface UserData {
    name: string
    born: string
    question?: string
}

export const userStore = create<UserStore>((set) => ({
    name: "",
    born: "",
    question: "",
    setUser: ({ name, born, question }) => set({ name, born, question: question ? question : "" }),
}))
