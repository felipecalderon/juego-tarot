"use client"
import { userStore } from "@/stores/userStore"
import { Button, DatePicker, DateValue, Input, Switch } from "@nextui-org/react"
import { MouseEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"

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
    needAsk: true,
}
export default function Cuestionario() {
    const { setUser } = userStore()
    const router = useRouter()
    const [form, setForm] = useState<FormCuestionario>(defaultForm)
    const [errors, setErrors] = useState({
        name: false,
        born: false,
        question: false,
    })
    const [touched, setTouched] = useState({
        name: false,
        born: false,
        question: false,
    })
    const [isLoading, setLoading] = useState(false)

    const isFormValid = () => {
        if (form.needAsk) {
            return Object.values(errors).every((error) => !error) && Object.values(form).every((value) => value !== "")
        } else {
            return errors.name === false && errors.born === false
        }
    }

    const handleCalendarChange = (e: DateValue) => {
        const dia = e ? e.day : ""
        const mes = e ? e.month : ""
        const anio = e ? e.year : ""
        setForm((prevForm) => ({
            ...prevForm,
            born: `${dia}/${mes}/${anio}`,
        }))
        setTouched((prev) => ({ ...prev, born: true }))
    }

    const handleSwitch = () => {
        setForm((prevForm) => ({ ...prevForm, needAsk: !prevForm.needAsk }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }))
        setTouched((prev) => ({ ...prev, [id]: true }))
    }

    const verifyErrors = (formCuestionario: FormCuestionario) => {
        const [dia, mes, anio] = formCuestionario.born.split("/")
        const [_nombre, _apellido, ...demas] = formCuestionario.name.split(" ")

        let newErrors = { ...errors }

        // valida si la fecha esta incorrecta
        if (touched.born && (!dia || !mes || !anio || anio.length < 4)) {
            newErrors.born = true
        } else {
            newErrors.born = false
        }
        // valida si el nombre está completo
        if (touched.name && (!_nombre || !demas.length)) {
            newErrors.name = true
        } else {
            newErrors.name = false
        }
        // valida si el cuestionario está ingresado y activado
        if (touched.question && formCuestionario.needAsk && !formCuestionario.question) {
            newErrors.question = true
        } else if (!formCuestionario.needAsk || formCuestionario.question) {
            newErrors.question = false
        }

        setErrors(newErrors)
    }

    useEffect(() => {
        if (touched.name || touched.born || touched.question) {
            verifyErrors(form)
        }
    }, [form, touched])

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isFormValid()) return

        setLoading(true)
        const user = {
            name: form.name,
            born: form.born,
            question: form.question,
        }
        setUser(user)
        await router.prefetch("/play")
        setLoading(false)
    }

    return (
        <form className="w-full flex flex-col gap-3 items-start">
            <label className="w-full">
                <Input
                    value={form.name}
                    autoComplete="off"
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
                maxValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone()).subtract({ years: 120 })}
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
                        label="Ej: Lograré conseguir el empleo?"
                        autoComplete="off"
                        id="question"
                        onChange={handleInputChange}
                        isInvalid={errors.question}
                        errorMessage="Ingresa tu consulta o desactiva la casilla"
                    />
                </label>
            )}
            <Button color="secondary" disabled={!isFormValid()} isLoading={isLoading} onClick={handleSubmit}>
                Ver el horóscopo
            </Button>
        </form>
    )
}
