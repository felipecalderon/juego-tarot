"use client"
import { Carta, Consulta } from "@/lib/interfaces"
import { Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import React, { useEffect, useMemo, useState } from "react"
import ModalTarot from "../modal"
import { calcularEdad } from "@/lib/calcularEdad"
import { fixNombre } from "@/lib/fixNombre"
import { consultaStore } from "@/stores/consultasStore"

interface RespBack {
    page: number
    pageSize: number
    total: number
    tops: {
        name: string
        count: number
    }[]
    data: Consulta[]
}
const Consultastabla = ({ consultas }: { consultas: RespBack }) => {
    const { data, page, pageSize, total, setData, setPage, setSize, setTotal } = consultaStore()
    const [openModal, setOpen] = useState(false)
    const [consulta, setConsulta] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const pages = useMemo(() => Math.ceil(total / pageSize), [consultas, pageSize])

    const verConsulta = (consulta: string) => {
        setOpen(true)
        setConsulta(consulta)
    }

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    const normalizedSearchTerm = useMemo(() => normalizeString(searchTerm.toLowerCase()), [searchTerm])

    const consultasFiltradas = useMemo(
        () => data.filter((c) => normalizeString(c.name.toLowerCase()).includes(normalizedSearchTerm)),
        [data, normalizedSearchTerm]
    )

    useEffect(() => {
        setData(consultas.data)
        setSize(consultas.pageSize)
        setPage(consultas.page)
        setTotal(consultas.total)
    }, [])
    return (
        <>
            <Paginacion page={page} pages={pages} setPage={setPage} />
            <Input
                color="secondary"
                name="nombre"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-fit mx-auto"
                label="Nombre del consultante"
            />
            <Table isStriped aria-label="Tabla de consultas de usuarios publica" selectionMode="single" color="secondary">
                <TableHeader>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>EDAD</TableColumn>
                    <TableColumn>PREGUNTA</TableColumn>
                </TableHeader>
                <TableBody>
                    {consultasFiltradas.map((consulta) => (
                        <TableRow key={consulta.id} className="cursor-pointer" onClick={() => verConsulta(consulta.answer)}>
                            <TableCell className="w-1/5">{fixNombre(consulta.name)}</TableCell>
                            <TableCell className="w-1/12">
                                {calcularEdad(consulta.born)} años <span className="text-xs">({consulta.born})</span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs md:max-w-md">
                                {consulta.question}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Paginacion page={page} pages={pages} setPage={setPage} />
            <ModalTarot isOpen={openModal} content={consulta} set={setOpen} />
        </>
    )
}

export default Consultastabla

const Paginacion = ({ page, pages, setPage }: { page: number; pages: number; setPage: (page: number) => void }) => {
    const { pageSize, setData } = consultaStore()
    const back_url = process.env.NEXT_PUBLIC_BACK_URL
    const getData = async () => {
        const res = await fetch(`${back_url}consultas?page=${page}&pageSize=${pageSize}`)
        if (res.ok) {
            const { data }: RespBack = await res.json()
            setData(data)
        }
    }

    useEffect(() => {
        getData()
    }, [page])
    return (
        <div className="flex w-full justify-center">
            <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)} />
        </div>
    )
}
