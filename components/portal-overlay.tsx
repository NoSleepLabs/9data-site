"use client"

import React, { useEffect } from 'react'

export default function PortalOverlay({ onClose, duration = 6000 }: { onClose: ()=>void, duration?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(100,150,255,0.85), rgba(0,0,0,0) 60%)', boxShadow: '0 0 60px rgba(100,150,255,0.9)' }}></div>
      <div style={{ position:'absolute', bottom: 40, fontFamily: "Open Sans, sans-serif", color: '#fff' }}>
        Portal Overlay
      </div>
      <style jsx>{`
        @keyframes portalPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          60% { transform: scale(1.0); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
