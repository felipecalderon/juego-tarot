"use client"
import { Carta } from "@/lib/interfaces"
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import React, { useMemo, useState } from "react"
import ModalTarot from "../modal"

interface Consulta {
    id: string
    question: string
    answer: string
    name: string
    born: string
    cards: Carta[]
}

const Consultastabla = ({ consultas }: { consultas: Consulta[] }) => {
    const [page, setPage] = useState(1)
    const [openModal, setOpen] = useState(false)
    const [consulta, setConsulta] = useState("")
    const rowsPerPage = 15

    const pages = Math.ceil(consultas.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return consultas.slice(start, end)
    }, [page, consultas])

    return (
        <>
            <Table
                isStriped
                aria-label="Tabla de consultas de usuarios publica"
                selectionMode="single"
                color="secondary"
                bottomContent={<Paginacion page={page} pages={pages} setPage={setPage} />}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((consulta) => (
                        <TableRow
                            key={consulta.id}
                            className="cursor-pointer"
                            onClick={() => {
                                setOpen(true)
                                setConsulta(consulta.answer)
                            }}
                        >
                            <TableCell className="w-1/5">{consulta.name}</TableCell>
                            <TableCell className="w-1/5">{consulta.born}</TableCell>
                            <TableCell>{consulta.question}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
