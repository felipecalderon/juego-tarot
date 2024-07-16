"use client"
import { Consulta } from "@/lib/interfaces"
import { Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import React, { useEffect, useMemo, useState } from "react"
import ModalTarot from "../modal"
import { calcularEdad } from "@/lib/calcularEdad"
import { fixNombre } from "@/lib/fixNombre"

const Consultastabla = ({ consultas }: { consultas: Consulta[] }) => {
    const [page, setPage] = useState(1)
    const [openModal, setOpen] = useState(false)
    const [consulta, setConsulta] = useState("")
    const [items, setItems] = useState<Consulta[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const rowsPerPage = 15

    const pages = useMemo(() => Math.ceil(consultas.length / rowsPerPage), [consultas, rowsPerPage])

    const verConsulta = (consulta: string) => {
        setOpen(true)
        setConsulta(consulta)
    }

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    const normalizedSearchTerm = useMemo(() => normalizeString(searchTerm.toLowerCase()), [searchTerm])

    const consultasFiltradas = useMemo(
        () => consultas.filter((c) => normalizeString(c.name.toLowerCase()).includes(normalizedSearchTerm)),
        [consultas, normalizedSearchTerm]
    )

    useEffect(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        setItems(consultasFiltradas.slice(start, end))
    }, [page, consultasFiltradas])
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
                    {items.map((consulta) => (
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

const Paginacion = ({ page, pages, setPage }: { page: number; pages: number; setPage: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="flex w-full justify-center">
            <Pagination isCompact showControls showShadow color="secondary" page={page} total={pages} onChange={(page) => setPage(page)} />
        </div>
    )
}
