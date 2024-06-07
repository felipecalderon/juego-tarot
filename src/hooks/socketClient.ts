"use client"
import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"

export default function useSocket(serverUrl: string) {
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        // Conectar al servidor de Socket.IO
        socketRef.current = io(serverUrl)

        // Manejar la conexión
        socketRef.current.on("connect", () => {
            console.log("Conectado al backend de Socket.IO")
        })

        // Desconectar en cleanup
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
                console.log("Desconectado del back")
            }
        }
    }, [serverUrl])

    return { socket: socketRef.current }
}
