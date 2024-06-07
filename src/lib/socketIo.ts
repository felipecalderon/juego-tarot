"use client"

import { io } from "socket.io-client"

export const socket = io("https://tarot-back-production.up.railway.app", {
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
})
