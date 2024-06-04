import { create } from "zustand"

interface UserStore {
    name: string
    born: string
    question: string
}

export const userStore = create<UserStore>((set) => ({
    name: "",
    born: "",
    question: "",
}))
