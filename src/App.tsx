import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Shop from './Shop'
import Cart from './Cart'
import Checkout from './Checkout'
import Payment from './Payment'

interface CryptoItem {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  amount: number
  totalPrice: number
}

function App() {
  const [cart, setCart] = useState<CryptoItem[]>([])

  const handleAddToCart = (item: CryptoItem) => {
    setCart(prev => [...prev, item])
  }

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const handlePaymentComplete = () => {
    setCart([]) // Clear the cart after successful payment
  }

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <div style={{ padding: '10px' }}>
      <nav style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: '#0066cc',
            fontFamily: "'Cooper Black', serif",
            fontSize: '1.1rem'
          }}>Shop</Link>
          <Link to="/cart" style={{ 
            textDecoration: 'none', 
            color: '#0066cc',
            fontFamily: "'Cooper Black', serif",
            fontSize: '1.1rem'
          }}>
            Cart ({cart.length})
          </Link>
        </div>
        <div style={{ 
          color: '#0066cc',
          fontFamily: "'Cooper Black', serif",
          fontSize: '1.1rem'
        }}>
          Total: ${total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Shop onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart items={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/payment" element={<Payment total={total} onPaymentComplete={handlePaymentComplete} />} />
      </Routes>
    </div>
  )
}

export default App
