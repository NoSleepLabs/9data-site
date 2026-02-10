"use client"

import { useEffect, useRef, useState } from "react"

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if scripts already loaded
    if ((window as any).THREE && (window as any).gsap) {
      initAnimation()
      return
    }

    // Load Three.js dynamically
    const loadScripts = async () => {
      try {
        // Add Three.js script first
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        script.async = false // Load synchronously
        
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

    function initAnimation() {
      const THREE = (window as any).THREE
      const gsap = (window as any).gsap

      let renderer, scene, camera, cube

      const Animation = {
        duration: 1.5,
        delay: 0.5,
        colors: {
          cube: 0xE0E0E0,
          platform: 0x9E9E9E,
          ground: 0xf99d17,
          background: 0x1a1a1a // Dark background instead of yellow
        }
      }

      function getDegree(degree) {
        return degree * Math.PI / 180
      }

      function newScene() {
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        scene = new THREE.Scene()

        const aspectRatio = windowWidth / windowHeight
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
          canvasRef.current.innerHTML = '' // Clear any existing content
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
        const material = new THREE.MeshLambertMaterial({ color: Animation.colors.ground })
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

        platformPositions.forEach((pos, i) => {
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

        // Simple animation without GSAP initially
        let time = 0
        function animateCube() {
          time += 0.01
          
          // Simple bouncing animation
          cube.position.y = -0.4 + Math.abs(Math.sin(time)) * 0.6
          cube.rotation.x = Math.sin(time * 0.5) * Math.PI / 4
          cube.rotation.y = time * 0.5
          
          // Fade in/out based on height
          cube.material.opacity = 0.3 + Math.abs(Math.sin(time)) * 0.7
          
          // Try to use GSAP if available for better animation
          if (gsap && !window.cubeAnimated) {
            window.cubeAnimated = true
            try {
              const tl = gsap.timeline({ repeat: -1, repeatDelay: Animation.delay })
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
              tl.timeScale(Animation.duration)
            } catch (e) {
              console.log('GSAP animation failed, using simple animation')
            }
          }
        }
        
        // Use simple animation initially
        animateCube()
      }

      function render() {
        if (renderer && scene && camera) {
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

  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:800');
        @import url('https://fonts.googleapis.com/css?family=Dancing+Script:700');
        
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #1a1a1a;
        }

        .social-links {
          font-family: 'Dancing Script', sans-serif;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 20px;
          margin: 0 auto;
          width: 280px;
          text-align: center;
          font-size: 12px;
          z-index: 100;
        }

        .social-links a {
          font-family: 'Open Sans', sans-serif;
          color: #ffffff;
          text-transform: uppercase;
          text-decoration: none;
        }

        .social-links span {
          font-size: 20px;
          margin: 0 5px;
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

      {/* Canvas Container */}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-white font-mono text-sm">Loading 3D Engine...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center text-white">
            <p className="mb-4 font-mono text-sm">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-black font-mono text-sm rounded hover:bg-gray-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Canvas Container */}
      <div ref={canvasRef} className="canvas-container" />

      {/* Social Links */}
      <p className="social-links">
        <a href="https://codepen.io/verlangieri/" target="_blank">codepen</a>
        <span>Or</span>
        <a href="https://twitter.com/verlangieri_d" target="_blank">twitter</a>
      </p>
    </>
  )
}