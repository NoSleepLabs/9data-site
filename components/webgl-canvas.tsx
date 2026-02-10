"use client"

import { useEffect, useRef } from "react"

interface WebGLCanvasProps {
  className?: string
}

export function WebGLCanvas({ className }: WebGLCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec3 a_color;
      uniform mat3 u_matrix;
      uniform float u_time;
      varying vec3 v_color;
      
      void main() {
        vec3 position = vec3(a_position, 1.0);
        float angle = u_time * 0.001;
        float c = cos(angle);
        float s = sin(angle);
        mat3 rotation = mat3(c, -s, 0, s, c, 0, 0, 0, 1);
        gl_Position = vec4((u_matrix * rotation * position).xy, 0, 1);
        v_color = a_color;
      }
    `

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 v_color;
      uniform float u_time;
      
      void main() {
        float pulse = sin(u_time * 0.003) * 0.3 + 0.7;
        gl_FragColor = vec4(v_color * pulse, 1.0);
      }
    `

    // Create and compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const colorLocation = gl.getAttribLocation(program, 'a_color')
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    // Create 3D cube data (projected to 2D)
    const vertices = new Float32Array([
      // Front face
      -0.5, -0.5,  0.0, 0.0, 1.0,
       0.5, -0.5,  0.0, 1.0, 1.0,
       0.5,  0.5,  0.0, 1.0, 0.0,
      -0.5, -0.5,  0.0, 0.0, 1.0,
       0.5,  0.5,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.0, 0.0, 0.0,
      
      // Back face
      -0.5, -0.5,  0.0, 1.0, 1.0,
       0.5, -0.5,  0.0, 0.0, 1.0,
       0.5,  0.5,  0.0, 0.0, 0.0,
      -0.5, -0.5,  0.0, 1.0, 1.0,
       0.5,  0.5,  0.0, 0.0, 0.0,
      -0.5,  0.5,  0.0, 1.0, 0.0,
    ])

    // Create buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    // Create transformation matrix
    function createMatrix(): Float32Array {
      const aspect = canvas.width / canvas.height
      const scale = 0.3
      return new Float32Array([
        scale / aspect, 0, 0,
        0, scale, 0,
        0, 0, 1
      ])
    }

    // Animation loop
    let animationId: number
    function render(time: number) {
      gl.clearColor(0.04, 0.04, 0.04, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      // Bind buffer and set attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 20, 0)
      
      gl.enableVertexAttribArray(colorLocation)
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 20, 8)

      // Set uniforms
      gl.uniformMatrix3fv(matrixLocation, false, createMatrix())
      gl.uniform1f(timeLocation, time)

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 12)

      animationId = requestAnimationFrame(render)
    }

    render(0)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 100%)' }}
      />
      <div className="absolute top-4 left-4 text-white/60 font-mono text-xs">
        <div>● WebGL 3D Visualization</div>
        <div>● Data Processing Network</div>
      </div>
    </div>
  )
}