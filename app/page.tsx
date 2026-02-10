"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-works"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { Budgets } from "@/components/budgets"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { SSHDemo } from "@/components/ssh-demo"

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [demoOpen, setDemoOpen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  useEffect(() => {
    if (!showIntro) return

    // Load Three.js dynamically
    const loadScripts = async () => {
      try {
        // Add Three.js script first
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        script.async = false
        
        // Add GSAP script
        const gsapScript = document.createElement('script')
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
        gsapScript.async = false
        
        document.head.appendChild(script)
        document.head.appendChild(gsapScript)
        
        // Wait for scripts to load
        const checkScripts = () => {
          if ((window as any).THREE && (window as any).gsap) {
            console.log('Scripts loaded, initializing animation')
            initAnimation()
          } else {
            console.log('Waiting for scripts...')
            setTimeout(checkScripts, 100)
          }
        }
        
        script.onload = () => {
          gsapScript.onload = () => {
            checkScripts()
          }
        }
        
        script.onerror = () => {
          console.error('Failed to load Three.js')
        }

      } catch (err) {
        console.error('Script loading error:', err)
      }
    }

    loadScripts()

    // Auto complete after 5 seconds
    const timer = setTimeout(() => {
      console.log('Animation complete, showing main site')
      setShowIntro(false)
    }, 5000)

    function initAnimation() {
      const THREE = (window as any).THREE
      const gsap = (window as any).gsap

      let renderer, scene, camera, cube

      const Animation = {
        duration: 1.5,
        delay: 0.5,
        colors: {
          cube: resolvedTheme === 'dark' ? 0xFFFFFF : 0x000000,
          platform: resolvedTheme === 'dark' ? 0x666666 : 0xCCCCCC,
          ground: resolvedTheme === 'dark' ? 0x111111 : 0xEEEEEE,
          background: resolvedTheme === 'dark' ? 0x000000 : 0xFFFFFF
        }
      }

      function getDegree(degree) {
        return degree * Math.PI / 180
      }

      function newScene() {
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        scene = new THREE.Scene()

        const factor = 130
        const near = 1
        const far = 10000
        camera = new THREE.OrthographicCamera(
          -windowWidth / factor, windowWidth / factor,
          windowHeight / factor, -windowHeight / factor,
          near, far
        )
        camera.position.set(7, 5, 5)
        camera.lookAt(scene.position)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setClearColor(new THREE.Color(Animation.colors.background), 1)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(windowWidth, windowHeight)
        renderer.setPixelRatio(window.devicePixelRatio)

        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''
          canvasRef.current.appendChild(renderer.domElement)
        }

        window.addEventListener('resize', windowResize, false)
        
        function windowResize() {
          if (renderer && camera) {
            const newWidth = window.innerWidth
            const newHeight = window.innerHeight
            renderer.setSize(newWidth, newHeight)
            camera.left = -newWidth / factor
            camera.right = newWidth / factor
            camera.top = newHeight / factor
            camera.bottom = -newHeight / factor
            camera.updateProjectionMatrix()
          }
        }
      }

      function newLights() {
        const light = new THREE.AmbientLight(0xFFFFFF, 0.9)
        const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.1)
        const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 0.1)
        shadowLight.position.set(10, 100, 30)
        shadowLight.castShadow = true
        scene.add(light)
        scene.add(hemisphereLight)
        scene.add(shadowLight)
      }

      function newGround() {
        const geometry = new THREE.PlaneGeometry(20, 20, 1, 1)
        const material = new THREE.MeshBasicMaterial({ 
          color: Animation.colors.ground,
          transparent: true,
          opacity: 0.1
        })
        const plane = new THREE.Mesh(geometry, material)
        plane.receiveShadow = true
        plane.rotation.x = getDegree(-90)
        plane.position.y = -2
        scene.add(plane)
      }

      function newPlatform() {
        const platformPositions = [
          [0, -1, 0.5],
          [0, -1, -0.5],
          [-1, -1, -0.5]
        ]

        platformPositions.forEach((pos) => {
          const geometry = new THREE.BoxGeometry(1, 0.2, 1)
          const material = new THREE.MeshLambertMaterial({ color: Animation.colors.platform })
          const platform = new THREE.Mesh(geometry, material)
          platform.position.set(pos[0], pos[1], pos[2])
          platform.castShadow = true
          scene.add(platform)
        })
      }

      function newCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshLambertMaterial({ 
          color: Animation.colors.cube, 
          transparent: true 
        })
        cube = new THREE.Mesh(geometry, material)
        cube.position.set(0, 2, 0.5)
        cube.castShadow = true
        scene.add(cube)

        // Generate random path (1-4)
        const pathIndex = Math.floor(Math.random() * 4) + 1
        let time = 0
        
        function animateCube() {
          time += 0.01
          
          // Different paths based on random selection
          switch(pathIndex) {
            case 1: // Original path - simple bounce
              cube.position.y = -0.4 + Math.abs(Math.sin(time)) * 0.6
              cube.rotation.x = Math.sin(time * 0.5) * Math.PI / 4
              cube.rotation.y = time * 0.5
              cube.position.z = 0.5
              break
              
            case 2: // Circular path around center
              const radius = 1.5
              cube.position.x = Math.cos(time * 0.8) * radius
              cube.position.z = Math.sin(time * 0.8) * radius + 0.5
              cube.position.y = -0.4 + Math.abs(Math.sin(time * 1.5)) * 0.3
              cube.rotation.x = Math.sin(time * 0.3) * Math.PI / 6
              cube.rotation.y = time * 0.6
              break
              
            case 3: // Figure-8 path
              const fig8Radius = 1.2
              cube.position.x = Math.cos(time * 0.7) * fig8Radius
              cube.position.y = Math.sin(time * 1.4) * 0.8 - 0.2
              cube.position.z = Math.sin(time * 0.7) * fig8Radius * 0.5 + 0.5
              cube.rotation.x = Math.sin(time * 0.4) * Math.PI / 3
              cube.rotation.z = Math.cos(time * 0.7) * Math.PI / 4
              break
              
            case 4: // Diagonal bounce pattern
              const diagonalTime = time * 0.6
              cube.position.x = Math.sin(diagonalTime) * 2
              cube.position.z = Math.cos(diagonalTime) * 1.5 + 0.5
              cube.position.y = -0.4 + Math.abs(Math.sin(diagonalTime * 2)) * 0.6
              cube.rotation.x = diagonalTime * 0.5
              cube.rotation.y = diagonalTime * 0.8
              cube.rotation.z = Math.sin(diagonalTime * 0.3) * Math.PI / 6
              break
          }
          
          // Fade in/out based on height
          cube.material.opacity = 0.3 + Math.abs(Math.sin(time)) * 0.7
        }
        
        console.log(`Cube path: ${pathIndex}`)
        
        // Use simple animation initially
        animateCube()
      }

      function render() {
        if (renderer && scene && camera && showIntro) {
          renderer.render(scene, camera)
          requestAnimationFrame(render)
        }
      }

      // Initialize everything
      newScene()
      newLights()
      newGround()
      newPlatform()
      newCube()
      render()
    }

    return () => {
      clearTimeout(timer)
    }
  }, [showIntro])

  return (
    <>
      {/* 3D Intro Animation */}
      {showIntro && (
        <>
          <style jsx global>{`
            html, body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: ${resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'};
            }

            .canvas-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
            }
          `}</style>
          
          <div ref={canvasRef} className="canvas-container" />
        </>
      )}

      {/* Main Site */}
      <main
        className={`transition-all duration-700 ease-out ${
          showIntro
            ? "opacity-0 translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Navbar onOpenDemo={() => setDemoOpen(true)} />
        <Hero />
        <About />
        <HowItWorks />
        <Services />
        <Clients />
        <Budgets />
        <CTA />
        <Footer />
      </main>

      <SSHDemo isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}