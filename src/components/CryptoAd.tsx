import { useState, useEffect } from 'react'
import { event } from '../utils/analytics'

interface CryptoAdProps {
  coin: {
    name: string
    symbol: string
    price: number
    change24h: number
    image: string
  }
  onClose: () => void
}

// Add keyframe animation for flashing
const flashAnimation = `
  @keyframes flash {
    0% { background-color: #FFD700; }
    25% { background-color: #FFA500; }
    50% { background-color: #FFD700; }
    75% { background-color: #FFA500; }
    100% { background-color: #FFD700; }
  }

  @keyframes popIn {
    0% { transform: scale(0) rotate(0deg); }
    50% { transform: scale(1.2) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
  }
`

// Star shape clip path
const starShape = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'

export default function CryptoAd({ coin, onClose }: CryptoAdProps) {
  // Generate random position within viewport
  const getRandomPosition = () => {
    const maxX = window.innerWidth - 200 // ad width
    const maxY = window.innerHeight - 200 // ad height
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    }
  }

  const [position, setPosition] = useState(getRandomPosition())
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Generate random discount between 80-95%
  const discount = Math.floor(Math.random() * 16) + 80

  // Track ad impressions
  useEffect(() => {
    event({
      action: 'ad_impression',
      category: 'advertising',
      label: `${coin.name} Ad`,
      value: coin.price
    })
  }, [coin])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y
      
      // Keep ad within viewport bounds
      const maxX = window.innerWidth - 200 // ad width
      const maxY = window.innerHeight - 200 // ad height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <>
      <style>{flashAnimation}</style>
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '200px',
          height: '200px',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 1000,
          userSelect: 'none',
          animation: 'popIn 0.5s ease-out'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Star Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#FFD700',
          clipPath: starShape,
          animation: 'flash 2s infinite',
          border: '3px solid #FF4500',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }} />

        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#FF4500',
            border: '2px solid #fff',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            padding: 0,
            lineHeight: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          ×
        </button>

        {/* Rectangular Content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '160px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          {/* KAPOW! effect */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#FF4500',
            transform: 'rotate(15deg)',
            textShadow: '2px 2px 0 #000',
            zIndex: 1
          }}>
            KAPOW!
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            marginBottom: '5px',
            position: 'relative',
            zIndex: 2
          }}>
            <img 
              src={coin.image} 
              alt={coin.name} 
              style={{ 
                width: '25px', 
                height: '25px',
                filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))'
              }}
            />
            <div>
              <h3 style={{ 
                margin: 0, 
                color: '#FF4500',
                fontSize: '14px',
                textShadow: '1px 1px 0 #fff'
              }}>{coin.name}</h3>
              <p style={{ 
                margin: '2px 0', 
                color: '#000',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>{coin.symbol}</p>
            </div>
          </div>

          <div style={{ 
            marginTop: '5px',
            padding: '5px',
            border: '2px dashed #FF4500',
            borderRadius: '4px'
          }}>
            <p style={{ 
              margin: '2px 0', 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#FF4500',
              textAlign: 'center'
            }}>
              {discount}% OFF!
            </p>
            <p style={{ 
              margin: '2px 0', 
              fontSize: '11px',
              textAlign: 'center',
              color: '#000',
              textDecoration: 'line-through'
            }}>
              ${coin.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p style={{ 
              margin: '2px 0', 
              fontSize: '14px',
              textAlign: 'center',
              color: '#FF4500',
              fontWeight: 'bold'
            }}>
              ${(coin.price * (1 - discount/100)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>

          <div 
            style={{ 
              marginTop: '5px', 
              padding: '5px', 
              backgroundColor: '#FF4500', 
              borderRadius: '4px',
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '12px',
              textShadow: '1px 1px 0 #000',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
            onClick={() => {
              window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
              // Track the rick roll event
              event({
                action: 'rick_roll',
                category: 'advertising',
                label: `${coin.name} Ad`,
                value: 1
              })
            }}
          >
            ACT NOW!
          </div>
        </div>
      </div>
    </>
  )
} 