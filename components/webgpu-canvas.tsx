"use client"

import { useEffect, useRef } from "react"

interface WebGPUCanvasProps {
  className?: string
}

export function WebGPUCanvas({ className }: WebGPUCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Simple 2D Canvas fallback if WebGPU fails
    function init2DFallback() {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let animationId: number
      const particles: Array<{x: number, y: number, radius: number, color: string, speed: number}> = []
      
      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `hsl(${160 + Math.random() * 60}, 80%, 60%)`,
          speed: Math.random() * 0.5 + 0.2
        })
      }

      function draw(time: number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw particles
        particles.forEach((particle, i) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          
          // Move particles in circular motion
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const angle = time * 0.001 * particle.speed + i * 0.2
          particle.x = centerX + Math.cos(angle) * (100 + i * 2)
          particle.y = centerY + Math.sin(angle) * (100 + i * 2)
        })
        
        animationId = requestAnimationFrame(draw)
      }

      draw(0)

      return () => {
        if (animationId) cancelAnimationFrame(animationId)
      }
    }

    // Try WebGPU first, fallback to 2D
    async function initWebGPU() {
      if (!navigator.gpu) {
        console.log('WebGPU not supported, using 2D fallback')
        return init2DFallback()
      }

      try {
        const adapter = await navigator.gpu.requestAdapter()
        if (!adapter) {
          console.log('No WebGPU adapter, using 2D fallback')
          return init2DFallback()
        }

        const device = await adapter.requestDevice()
        const context = canvas.getContext('webgpu') as GPUCanvasContext

        if (!context) {
          console.log('Failed to get WebGPU context, using 2D fallback')
          return init2DFallback()
        }

        // WebGPU implementation would go here
        console.log('WebGPU initialized successfully')
        init2DFallback() // For now, use 2D fallback to ensure logo shows
      } catch (error) {
        console.log('WebGPU error, using 2D fallback:', error)
        return init2DFallback()
      }
    }

    initWebGPU()

  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}