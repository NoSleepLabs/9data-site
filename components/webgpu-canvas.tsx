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

    let device: GPUDevice | null = null
    let context: GPUCanvasContext | null = null
    let animationId: number | null = null

    async function initWebGPU() {
      if (!navigator.gpu) {
        console.error('WebGPU not supported')
        return
      }

      const adapter = await navigator.gpu.requestAdapter()
      if (!adapter) {
        console.error('No WebGPU adapter found')
        return
      }

      device = await adapter.requestDevice()
      context = canvas.getContext('webgpu') as GPUCanvasContext

      if (!context) {
        console.error('Failed to get WebGPU context')
        return
      }

      // Configure context
      const presentationFormat = navigator.gpu.getPreferredCanvasFormat()
      context.configure({
        device,
        format: presentationFormat,
        alphaMode: 'premultiplied',
      })

      // Vertex shader
      const vertexShaderCode = `
        struct VertexOutput {
          @builtin(position) position: vec4<f32>,
          @location(0) color: vec4<f32>,
          @location(1) texCoord: vec2<f32>,
        };

        @vertex
        fn main(@location(0) position: vec3<f32>, @location(1) color: vec4<f32>) -> VertexOutput {
          var output: VertexOutput;
          output.position = vec4<f32>(position, 1.0);
          output.color = color;
          output.texCoord = vec2<f32>(position.xy * 0.5 + 0.5);
          return output;
        }
      `

      // Fragment shader with animation
      const fragmentShaderCode = `
        @fragment
        fn main(@location(0) color: vec4<f32>, @location(1) texCoord: vec2<f32>) -> @location(0) vec4<f32> {
          let time = uniformTime;
          let pulse = sin(time * 0.003) * 0.3 + 0.7;
          
          // Add some noise/texture effect
          let noise = sin(texCoord.x * 20.0 + time * 0.01) * cos(texCoord.y * 20.0 + time * 0.02) * 0.1;
          
          return color * pulse * (1.0 + noise);
        }
      `

      const shaderModule = device.createShaderModule({
        code: fragmentShaderCode.replace('uniformTime', '@group(0) @binding(0) var<uniform> uniformTime: f32;')
      })

      const vertexShaderModule = device.createShaderModule({
        code: vertexShaderCode
      })

      // Pipeline
      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: vertexShaderModule,
          entryPoint: 'main',
          buffers: [
            {
              arrayStride: 28, // 3 floats position + 4 floats color
              attributes: [
                {
                  shaderLocation: 0,
                  offset: 0,
                  format: 'float32x3'
                },
                {
                  shaderLocation: 1,
                  offset: 12,
                  format: 'float32x4'
                }
              ]
            }
          ]
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'main',
          targets: [{
            format: presentationFormat
          }]
        },
        primitive: {
          topology: 'triangle-list'
        },
        depthStencil: {
          depthWriteEnabled: true,
          depthCompare: 'less',
          format: 'depth24plus'
        }
      })

      // Create 3D geometry - rotating particles/cubes around center
      const vertices: number[] = []
      const particleCount = 100
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = 0.8 + Math.random() * 0.4
        const height = (Math.random() - 0.5) * 0.6
        
        // Create small triangle for each particle
        const size = 0.01 + Math.random() * 0.02
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = height
        
        // Triangle vertices
        vertices.push(
          x - size, y - size, z, 0.2, 0.8, 1.0, 0.8,  // Green-cyan color
          x + size, y - size, z, 0.2, 0.8, 1.0, 0.8,
          x, y + size, z, 0.2, 0.8, 1.0, 0.8,
        )
      }

      // Add central cube vertices
      const cubeSize = 0.1
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * cubeSize
        const z = Math.sin(angle) * cubeSize
        vertices.push(
          x - cubeSize, -cubeSize, z - cubeSize, 1.0, 0.2, 1.0, 1.0,  // Purple
          x + cubeSize, -cubeSize, z - cubeSize, 1.0, 0.2, 1.0, 1.0,
          x + cubeSize, +cubeSize, z - cubeSize, 1.0, 0.2, 1.0, 1.0,
        )
      }

      const vertexBuffer = device.createBuffer({
        size: vertices.length * 4,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
      })
      device.queue.writeBuffer(vertexBuffer, 0, new Float32Array(vertices))

      // Uniform buffer for time
      const uniformBuffer = device.createBuffer({
        size: 4, // Single float for time
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      })

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{
          binding: 0,
          resource: {
            buffer: uniformBuffer
          }
        }]
      })

      // Depth texture
      const depthTexture = device.createTexture({
        size: [canvas.width, canvas.height],
        format: 'depth24plus',
        usage: GPUTextureUsage.RENDER_ATTACHMENT
      })

      // Animation loop
      function render(time: number) {
        // Update time uniform
        device.queue.writeBuffer(uniformBuffer, 0, new Float32Array([time * 0.001]))

        const commandEncoder = device.createCommandEncoder()
        const textureView = context.getCurrentTexture().createView()

        const renderPass = commandEncoder.beginRenderPass({
          colorAttachments: [{
            view: textureView,
            clearValue: { r: 0, g: 0, b: 0, a: 0 },
            loadOp: 'clear',
            storeOp: 'store'
          }],
          depthStencilAttachment: {
            view: depthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'store'
          }
        })

        renderPass.setPipeline(pipeline)
        renderPass.setBindGroup(0, bindGroup)
        renderPass.setVertexBuffer(0, vertexBuffer)
        renderPass.draw(vertices.length / 7) // Each particle/triangle has 7 floats (3 pos + 4 color)
        renderPass.end()

        device.queue.submit([commandEncoder.finish()])
        animationId = requestAnimationFrame(render)
      }

      render(0)

      // Handle resize
      const handleResize = () => {
        if (!canvas || !context) return
        
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        
        const newDepthTexture = device.createTexture({
          size: [canvas.width, canvas.height],
          format: 'depth24plus',
          usage: GPUTextureUsage.RENDER_ATTACHMENT
        })
      }

      window.addEventListener('resize', handleResize)

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
        if (animationId) cancelAnimationFrame(animationId)
        vertexBuffer.destroy()
        uniformBuffer.destroy()
        depthTexture.destroy()
      }
    }

    initWebGPU().catch(console.error)

  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}