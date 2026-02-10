"use client"

import { WebGLCanvas } from "./webgl-canvas"

export function ThreeDSection() {
  return (
    <section className="relative py-20 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-pixel text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            3D DATA VISUALIZATION
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Experience our infrastructure in real-time 3D. Monitor data flow, server status, 
            and network topology through our WebGL-powered visualization engine.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border overflow-hidden bg-card shadow-xl">
              <div className="h-96">
                <WebGLCanvas className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
              <h3 className="font-pixel text-sm font-bold tracking-tight text-foreground mb-4">
                SYSTEM STATUS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">CPU Usage</span>
                  <span className="font-mono text-xs text-green-500">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Memory</span>
                  <span className="font-mono text-xs text-yellow-500">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Network</span>
                  <span className="font-mono text-xs text-green-500">1.2 Gbps</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Uptime</span>
                  <span className="font-mono text-xs text-green-500">142d 3h</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
              <h3 className="font-pixel text-sm font-bold tracking-tight text-foreground mb-4">
                DATA FLOW
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">In/Out</span>
                  <span className="font-mono text-xs text-cyan-500">2.4/1.8 GB/s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Connections</span>
                  <span className="font-mono text-xs text-blue-500">8,421</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Processed</span>
                  <span className="font-mono text-xs text-purple-500">1.2 PB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">Latency</span>
                  <span className="font-mono text-xs text-green-500">0.8 ms</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-lg">
              <h3 className="font-pixel text-sm font-bold tracking-tight text-foreground mb-2">
                WEBGL RENDER
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                Real-time 3D graphics powered by WebGL
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-pixel text-[10px] text-green-500">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}