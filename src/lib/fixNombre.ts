export const fixNombre = (name: string) => {
    const nombre = name.split(" ")
    const nombreFinal = nombre.map((persona) => persona.charAt(0).toUpperCase() + persona.toLowerCase().slice(1))
    return nombreFinal.join(" ")
}
