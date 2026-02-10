"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface ThreeJSSceneProps {
  className?: string
}

export function ThreeJSScene({ className }: ThreeJSSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 30)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0x00ff88, 1, 100)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff0088, 1, 100)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    // Create data visualization elements
    const dataNodes: THREE.Mesh[] = []
    const connections: THREE.Line[] = []

    // Central server node
    const serverGeometry = new THREE.BoxGeometry(4, 4, 4)
    const serverMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ff88,
      emissive: 0x002211,
      emissiveIntensity: 0.2
    })
    const server = new THREE.Mesh(serverGeometry, serverMaterial)
    scene.add(server)
    dataNodes.push(server)

    // Create orbiting data nodes
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 15
      
      const nodeGeometry = new THREE.SphereGeometry(1.5, 16, 16)
      const nodeMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(i / 8, 1, 0.5),
        emissive: new THREE.Color().setHSL(i / 8, 1, 0.2),
        emissiveIntensity: 0.3
      })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = Math.sin(i * 0.5) * 5
      
      node.position.set(x, y, z)
      scene.add(node)
      dataNodes.push(node)

      // Create connections to center
      const points = []
      points.push(new THREE.Vector3(0, 0, 0))
      points.push(new THREE.Vector3(x, y, z))
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x444444,
        opacity: 0.5,
        transparent: true
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
      connections.push(line)
    }

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x888888,
      transparent: true,
      opacity: 0.6
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate central server
      server.rotation.x += 0.01
      server.rotation.y += 0.01

      // Animate orbiting nodes
      dataNodes.forEach((node, i) => {
        if (i === 0) return // Skip central server
        
        const time = Date.now() * 0.001
        const angle = (i / 8) * Math.PI * 2 + time * 0.5
        const radius = 15 + Math.sin(time + i) * 2
        
        node.position.x = Math.cos(angle) * radius
        node.position.z = Math.sin(angle) * radius
        node.position.y = Math.sin(time * 2 + i) * 5
        node.rotation.y += 0.02
      })

      // Animate connections
      connections.forEach((line, i) => {
        const node = dataNodes[i + 1]
        const positions = line.geometry.attributes.position
        positions.array[3] = node.position.x
        positions.array[4] = node.position.y
        positions.array[5] = node.position.z
        positions.needsUpdate = true
      })

      // Rotate particles
      particlesMesh.rotation.y += 0.001

      controls.update()
      renderer.render(scene, camera)
    }

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)
    setIsLoaded(true)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="font-pixel text-xs text-muted-foreground">Loading 3D Visualization...</p>
          </div>
        </div>
      )}
    </div>
  )
}