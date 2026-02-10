"use client"

import { useEffect, useRef } from "react"

interface FlowingDotsBannerProps {
  className?: string
}

const FlowingDotsBanner = ({ className = "" }: FlowingDotsBannerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.parentElement?.getBoundingClientRect()
    const displayWidth = rect?.width ?? window.innerWidth
    const displayHeight = rect?.height ?? window.innerHeight
    
    canvas.width = displayWidth
    canvas.height = displayHeight
    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`
    
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()
    
    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)
    
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      timeRef.current += 0.005

      ctx.fillStyle = "#F0EEE6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Simple flowing dots
      const dotCount = 50
      for (let i = 0; i < dotCount; i++) {
        const x = (Math.sin(i * 0.2 + timeRef.current) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(i * 0.1 + timeRef.current * 0.3) * 0.5 + 0.5) * canvas.height
        
        const size = 1 + Math.sin(i + timeRef.current) * 2
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(80, 80, 80, 0.6)"
        ctx.fill()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }
  }, [])

  return (
    <div className={`absolute inset-0 w-full h-24 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowingDotsBanner