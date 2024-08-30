import { Consulta } from "@/lib/interfaces"
import { create } from "zustand"

interface ConsultaStore {
    page: number
    pageSize: number
    total: number
    tops: {
        name: string
        count: number
    }[]
    data: Consulta[]

    setPage: (page: number) => void
    setSize: (size: number) => void
    setTotal: (total: number) => void
    setTops: (tops: { name: string; count: number }[]) => void
    setData: (consultas: Consulta[]) => void
}

export const consultaStore = create<ConsultaStore>((set, get) => ({
    page: 1,
    pageSize: 10,
    total: 0,
    tops: [],
    data: [],
    setPage: (page) => set({ page }),
    setSize: (pageSize) => set({ pageSize }),
    setTotal: (total) => set({ total }),
    setTops: (tops) => set({ tops }),
    setData: (data) => set({ data }),
}))
