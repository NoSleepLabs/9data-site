"use client"

import { useEffect, useRef } from "react"

const FlowingDotsBanner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      const displayWidth = rect?.width ?? window.innerWidth
      const displayHeight = rect?.height ?? window.innerHeight
      
      canvas.width = displayWidth
      canvas.height = displayHeight
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      timeRef.current += 0.005

      ctx.fillStyle = "#F0EEE6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const dotCount = 30
      for (let i = 0; i < dotCount; i++) {
        const x = (Math.sin(i * 0.2 + timeRef.current) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(i * 0.1 + timeRef.current * 0.3) * 0.5 + 0.5) * canvas.height
        const size = 2 + Math.sin(i + timeRef.current) * 1
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(128, 128, 128, 0.4)"
        ctx.fill()
      }
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-24 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowingDotsBanner