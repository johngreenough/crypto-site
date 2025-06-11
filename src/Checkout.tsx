import { useNavigate } from 'react-router-dom'
import SkyBackground from './components/SkyBackground'
import { event } from './utils/analytics'

interface CryptoItem {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  amount: number
  totalPrice: number
}

export default function Checkout({ cart, onRemoveFromCart }: { cart: CryptoItem[], onRemoveFromCart: (id: string) => void }) {
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0)

  const handleProceedToPayment = () => {
    // Track checkout initiation
    event({
      action: 'begin_checkout',
      category: 'ecommerce',
      label: 'Proceed to Payment',
      value: total
    })
    navigate('/payment')
  }

  return (
    <>
      <SkyBackground />
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ 
          color: '#cc0000',
          fontFamily: "'Cooper Black', serif",
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          letterSpacing: '0.5px',
          textAlign: 'center'
        }}>Checkout</h2>
        {cart.length === 0 ? (
          <p style={{ 
            color: '#0066cc',
            fontSize: '1.2rem',
            fontFamily: "'Cooper Black', serif",
            textAlign: 'center'
          }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ marginBottom: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 12,
                  padding: '12px',
                  border: '2px solid #0066cc',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <div>
                    <h3 style={{ 
                      margin: 0,
                      color: '#0066cc',
                      fontSize: '1.3rem',
                      fontFamily: "'Cooper Black', serif"
                    }}>{item.name} ({item.symbol})</h3>
                    <p style={{ 
                      margin: '4px 0',
                      color: '#0066cc',
                      fontSize: '1.1rem'
                    }}>Amount: {item.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3
                    })} {item.symbol}</p>
                    <p style={{ 
                      margin: '4px 0',
                      color: '#0066cc',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>${item.totalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveFromCart(item.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#cc0000',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontFamily: "'Cooper Black', serif"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={{ 
              border: '2px solid #0066cc',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                margin: '0 0 1rem 0',
                color: '#0066cc',
                fontSize: '1.5rem',
                fontFamily: "'Cooper Black', serif"
              }}>Total</h3>
              <p style={{ 
                margin: 0,
                color: '#0066cc',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>${total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
            </div>
            <button 
              onClick={handleProceedToPayment}
              style={{
                padding: '12px 24px',
                backgroundColor: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.3rem',
                fontFamily: "'Cooper Black', serif",
                display: 'block',
                margin: '0 auto',
                width: '100%',
                maxWidth: '300px'
              }}
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </>
  )
} 