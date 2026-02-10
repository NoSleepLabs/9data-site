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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  useEffect(() => {
    if (!showIntro) return

    // Check if scripts already loaded
    if ((window as any).THREE && (window as any).gsap) {
      initAnimation()
      setIsLoading(false)
      return
    }

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
            setIsLoading(false)
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
          setError('Failed to load 3D engine')
          setIsLoading(false)
        }
        
        gsapScript.onerror = () => {
          console.error('Failed to load GSAP')
          setError('Failed to load animation library')
          setIsLoading(false)
        }

      } catch (err) {
        console.error('Script loading error:', err)
        setError('Loading error')
        setIsLoading(false)
      }
    }

    loadScripts()

    // Auto complete after 5 seconds
    const timer = setTimeout(() => {
      console.log('Animation complete, showing main site')
      setShowIntro(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }

  }, [showIntro])

  function initAnimation() {
    const THREE = (window as any).THREE
    const gsap = (window as any).gsap

    let renderer, scene, camera, cube

    const Animation = {
      duration: 1.5,
      delay: 0.5,
      colors: {
        cube: resolvedTheme === 'dark' ? 0xFFFFFF : 0x000000, // White cube in dark mode, black cube in light mode
        platform: resolvedTheme === 'dark' ? 0x666666 : 0xCCCCCC, // Gray platforms
        ground: resolvedTheme === 'dark' ? 0x111111 : 0xEEEEEE, // Dark/light ground
        background: resolvedTheme === 'dark' ? 0x000000 : 0xFFFFFF // Black background in dark mode, white in light mode
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
        opacity: 0.1 // Very transparent floor
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
        
        // Try to use GSAP if available for better animation
        if (gsap && !window.cubeAnimated) {
          window.cubeAnimated = true
          try {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: Animation.delay })
            
            // Different GSAP animations for each path
            if (pathIndex === 1) {
              // Original bounce animation
              tl.set(cube.material, { opacity: 0 })
              tl.to(cube.position, 0.8, { y: -0.4, ease: "bounce.out" })
              tl.to(cube.scale, 0.8, { y: 1, ease: "bounce.out" }, "-=0.8")
              tl.to(cube.material, 0.5, { opacity: 1 }, "-=0.8")
              tl.to(cube.rotation, 0.8, { x: getDegree(-90) }, "+=0.2")
              tl.to(cube.position, 0.3, { y: -0.2 }, "-=0.8")
              tl.to(cube.position, 0.8, { z: -0.5 }, "-=0.8")
              tl.to(cube.position, 0.3, { y: -0.4 }, "-=0.4")
              tl.to(cube.rotation, 0.8, { y: getDegree(-90) })
              tl.to(cube.position, 0.3, { y: -0.2 }, "-=0.8")
              tl.to(cube.position, 0.8, { x: -1 }, "-=0.8")
              tl.to(cube.position, 0.3, { y: -0.4 }, "-=0.4")
              tl.to(cube.rotation, 0.8, { x: 0, ease: "power3.out" })
              tl.to(cube.position, 0.8, { z: 0.8, ease: "power3.out" }, "-=0.8")
              tl.to(cube.position, 0.6, { y: -4, ease: "power3.in" }, "-=0.80")
              tl.to(cube.scale, 0.8, { y: 1.5 }, "-=0.5")
              tl.to(cube.material, 0.25, { opacity: 0 }, "-=0.85")
            } else if (pathIndex === 2) {
              // Circular path animation
              tl.set(cube.material, { opacity: 0 })
              tl.to(cube.position, 1.2, { 
                x: 1.5, 
                ease: "power2.inOut" 
              })
              tl.to(cube.rotation, 1.2, { y: Math.PI * 2 }, "-=1.2")
              tl.to(cube.position, 1.2, { z: -1, ease: "power2.inOut" })
              tl.to(cube.position, 1.2, { 
                x: -1.5, 
                y: -0.2,
                ease: "bounce.out"
              }, "-=1.2")
              tl.to(cube.material, 0.5, { opacity: 1 }, "-=0.5")
            } else if (pathIndex === 3) {
              // Figure-8 path animation
              tl.set(cube.material, { opacity: 0 })
              tl.to(cube.position, 1.0, { 
                x: 1.2, 
                y: -1,
                ease: "power4.inOut"
              })
              tl.to(cube.position, 0.8, { 
                x: -1.2, 
                y: -0.4,
                ease: "bounce.out"
              })
              tl.to(cube.position, 0.8, { 
                x: 0, 
                z: 1,
                ease: "power2.inOut"
              })
              tl.to(cube.rotation, 0.8, { 
                x: Math.PI / 3,
                y: Math.PI / 2
              })
            } else if (pathIndex === 4) {
              // Diagonal bounce animation
              tl.set(cube.material, { opacity: 0 })
              tl.to(cube.position, 1.5, { 
                x: 2, 
                y: -0.4,
                ease: "power2.inOut"
              })
              tl.to(cube.position, 1.0, { 
                x: -2, 
                z: 1.5,
                ease: "power3.out"
              })
              tl.to(cube.position, 0.8, { 
                y: -0.2,
                ease: "bounce.out"
              })
              tl.to(cube.rotation, 0.8, { 
                x: Math.PI / 6,
                y: Math.PI / 3,
                z: Math.PI / 4
              })
            }
            
            tl.timeScale(Animation.duration)
          } catch (e) {
            console.log('GSAP animation failed, using simple animation')
          }
        }
      }
      
      console.log(`Cube path: ${pathIndex}`)
      
      // Use simple animation initially
      animateCube()
    }
      }
      
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

  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <>
      {/* 3D Intro Animation */}
      {showIntro && (
        <>
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css?family=Open+Sans:800');
            @import url('https://fonts.googleapis.com/css?family=Dancing+Script:700');
            
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



          {/* Error State */}
          {error && (
            <div className={`fixed inset-0 flex items-center justify-center z-50`} style={{backgroundColor: resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}}>
              <div className={`text-center ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}>
                <p className="mb-4 font-mono text-sm">Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className={`px-4 py-2 font-mono text-sm rounded hover:opacity-80 transition-opacity ${
                    resolvedTheme === 'dark' 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Canvas Container */}
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