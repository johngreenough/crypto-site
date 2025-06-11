import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getCryptoLogo } from './utils/cryptoLogos'
import SkyBackground from './components/SkyBackground'

interface CartItem {
  id: string
  name: string
  symbol: string
  price: number
  amount: number
  totalPrice: number
}

interface CartProps {
  items: CartItem[]
  onRemoveFromCart: (id: string) => void
}

export default function Cart({ items, onRemoveFromCart }: CartProps) {
  const navigate = useNavigate()
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <>
      <SkyBackground />
      <h2 style={{ 
        color: '#e60000',
        fontFamily: "'Cooper Black', serif",
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
        letterSpacing: '0.5px',
        textAlign: 'center'
      }}>Your Cart</h2>
      {items.length === 0 ? (
        <p style={{ 
          color: '#0066cc',
          fontSize: '1.2rem',
          fontFamily: "'Cooper Black', serif",
          textAlign: 'center'
        }}>Your cart is empty</p>
      ) : (
        <>
          <div style={{ 
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  padding: '1rem',
                  border: '2px solid #0066cc',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '3px solid #e60000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: 'white'
                  }}>
                    <img
                      src={getCryptoLogo(item.id)}
                      alt={item.name}
                      style={{ 
                        width: '24px', 
                        height: '24px',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      color: '#0066cc',
                      fontSize: '1.3rem',
                      fontFamily: "'Cooper Black', serif"
                    }}>
                      {item.name} ({item.symbol})
                    </h3>
                    <p style={{ 
                      margin: '0.25rem 0',
                      color: '#0066cc',
                      fontSize: '1.1rem'
                    }}>
                      Amount: {item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3
                      })} {item.symbol}
                    </p>
                    <p style={{ 
                      margin: '0.25rem 0',
                      color: '#0066cc',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      ${item.totalPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#e60000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontFamily: "'Cooper Black', serif"
                  }}
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </div>
          <div style={{ 
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1rem',
            border: '2px solid #0066cc',
            borderRadius: '8px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h3 style={{ 
                margin: 0,
                color: '#0066cc',
                fontSize: '1.5rem',
                fontFamily: "'Cooper Black', serif"
              }}>Total</h3>
              <p style={{ 
                margin: 0,
                color: '#0066cc',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                ${total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#0066cc',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.3rem',
                fontFamily: "'Cooper Black', serif"
              }}
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}
    </>
  )
} 