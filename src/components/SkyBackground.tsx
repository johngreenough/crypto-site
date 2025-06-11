import React from 'react'

const Cloud = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={{
      position: 'absolute',
      background: 'white',
      borderRadius: '50px',
      width: '200px',
      height: '60px',
      filter: 'blur(5px)',
      opacity: 0.8,
      ...style
    }}
  />
)

export default function SkyBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)',
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Cloud 1 */}
      <Cloud
        style={{
          top: '15%',
          left: '10%',
          transform: 'scale(1.2)',
        }}
      />
      {/* Cloud 2 */}
      <Cloud
        style={{
          top: '25%',
          left: '40%',
          transform: 'scale(0.8)',
        }}
      />
      {/* Cloud 3 */}
      <Cloud
        style={{
          top: '10%',
          left: '70%',
          transform: 'scale(1.5)',
        }}
      />
      {/* Cloud 4 */}
      <Cloud
        style={{
          top: '35%',
          left: '20%',
          transform: 'scale(1.1)',
        }}
      />
      {/* Cloud 5 */}
      <Cloud
        style={{
          top: '20%',
          left: '60%',
          transform: 'scale(0.9)',
        }}
      />
      {/* Cloud 6 */}
      <Cloud
        style={{
          top: '30%',
          left: '85%',
          transform: 'scale(1.3)',
        }}
      />
    </div>
  )
} 