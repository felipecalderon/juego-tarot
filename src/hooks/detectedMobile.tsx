"use client"
import { useEffect, useState } from "react"

export default function useMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        const mobileDevices = ["android", "iphone", "ipad", "ipod", "blackberry", "windows phone"]
        const isMobileDevice = mobileDevices.some((device) => userAgent.includes(device))
        setIsMobile(isMobileDevice)
    }, [])
    return { isMobile }
}
