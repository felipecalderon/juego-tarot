"use client"
import { Button, DatePicker, DateValue, Input, Switch } from "@nextui-org/react"
import { MouseEvent, useState } from "react"

type FormCuestionario = {
    name: string
    question: string
    born: string
    needAsk: boolean
}

const defaultForm = {
    name: "",
    question: "",
    born: "",
    needAsk: false,
}
export default function Cuestionario() {
    const [form, setForm] = useState<FormCuestionario>(defaultForm)
    const [errors, setErrors] = useState({
        name: false,
        born: false,
        question: false,
    })

    const handleCalendarChange = (e: DateValue) => {
        const dia = e ? e.day : ""
        const mes = e ? e.month : ""
        const anio = e ? e.year : ""
        setForm({
            ...form,
            born: `${dia}/${mes}/${anio}`,
        })
    }
    const handleSwitch = () => setForm({ ...form, needAsk: !form.needAsk })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        const [dia, mes, anio] = form.born.split("/")
        const [nombre, apellido, ...demas] = form.name.split(" ")

        // valida si la fecha esta incorrecta
        if (!dia || !mes || !anio || anio.length < 4) {
            setErrors((errors) => ({ ...errors, born: true }))
        } else {
            setErrors((errors) => ({ ...errors, born: false }))
        }
        // valida si el nombre está completo
        if (!demas.length) {
            setErrors((errors) => ({ ...errors, name: true }))
        } else {
            setErrors((errors) => ({ ...errors, name: false }))
        }
        // valida si la fecha esta incorrecta
        if (form.needAsk && !form.question) {
            setErrors((errors) => ({ ...errors, question: true }))
        } else {
            setErrors((errors) => ({ ...errors, question: false }))
        }
    }

    return (
        <form className="w-full flex flex-col gap-3 items-start">
            <label className="w-full">
                <Input
                    value={form.name}
                    label="Ingresa tu nombre completo"
                    id="name"
                    isInvalid={errors.name}
                    errorMessage="Por favor ingresa tu nombre completo"
                    onChange={handleInputChange}
                />
            </label>
            <DatePicker
                fullWidth
                label="Fecha de nacimiento"
                onChange={handleCalendarChange}
                isInvalid={errors.born}
                showMonthAndYearPickers
                errorMessage="Tu nacimiento importa mucho para una predicción precisa"
            />
            <label className="w-fit flex items-center">
                <Switch isSelected={form.needAsk} onChange={handleSwitch} color="secondary" />
                <span className="text-white">Hacer una pregunta</span>
            </label>
            {form.needAsk && (
                <label className="w-full">
                    <Input
                        label="¿Cual es tu consulta o duda?"
                        id="question"
                        isInvalid={errors.question}
                        errorMessage="Ingresa tu consulta o desactiva la casilla"
                    />
                </label>
            )}
            <Button color="secondary" onClick={handleSubmit}>
                Ver el horóscopo
            </Button>
        </form>
    )
}
