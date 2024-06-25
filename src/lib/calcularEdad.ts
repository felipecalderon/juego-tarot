export const calcularEdad = (dateString: string) => {
    // Parsear la fecha inicial
    const [day, month, year] = dateString.split("/").map(Number)
    const initialDate = new Date(year, month - 1, day)

    // Obtener la fecha actual
    const currentDate = new Date()

    // Calcular la diferencia en años
    let yearsDifference = currentDate.getFullYear() - initialDate.getFullYear()

    // Ajustar si la fecha actual aún no ha alcanzado el mes/día de la fecha inicial
    const monthDifference = currentDate.getMonth() - initialDate.getMonth()
    const dayDifference = currentDate.getDate() - initialDate.getDate()
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        yearsDifference--
    }

    return yearsDifference
}
