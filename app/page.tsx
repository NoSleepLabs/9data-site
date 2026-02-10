"use client"

import { useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Page() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Load Three.js dynamically
    const loadThree = async () => {
      if (typeof window !== 'undefined') {
        // Add Three.js script
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        script.async = true
        
        // Add GSAP script
        const gsapScript = document.createElement('script')
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
        gsapScript.async = true
        
        document.head.appendChild(script)
        document.head.appendChild(gsapScript)
        
        script.onload = () => {
          gsapScript.onload = () => {
            // Three.js is loaded, now init the scene
            if ((window as any).THREE && (window as any).gsap) {
              initAnimation()
            }
          }
        }
      }
    }

    loadThree()

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

        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor(new THREE.Color(Animation.colors.background), 1)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(windowWidth, windowHeight)

        if (canvasRef.current) {
          canvasRef.current.appendChild(renderer.domElement)
        }

        window.addEventListener('resize', windowResize, false)
        
        function windowResize() {
          if (renderer && camera) {
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.left = -window.innerWidth / factor
            camera.right = window.innerWidth / factor
            camera.top = window.innerHeight / factor
            camera.bottom = -window.innerHeight / factor
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

        // GSAP Animation
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