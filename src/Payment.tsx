import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SkyBackground from './components/SkyBackground'

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  name: string
}

type PaymentMethod = 'card' | 'crypto'

export default function Payment({ total, onPaymentComplete }: { total: number, onPaymentComplete: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the payment here
    alert('Payment processed successfully!')
    onPaymentComplete()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <SkyBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}
      >
        <h2>Payment Details</h2>
        <p>Total Amount: ${total.toLocaleString()}</p>

        <div style={{ marginBottom: '20px' }}>
          <h3>Select Payment Method</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPaymentMethod('card')}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: paymentMethod === 'card' ? '#2196F3' : '#f5f5f5',
                color: paymentMethod === 'card' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Credit Card
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPaymentMethod('crypto')}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: paymentMethod === 'crypto' ? '#2196F3' : '#f5f5f5',
                color: paymentMethod === 'crypto' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Crypto
            </motion.button>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <div>
              <label htmlFor="name">Cardholder Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="1234 5678 9012 3456"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Pay ${total.toLocaleString()}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <h3>Pay with Crypto</h3>
            <p>Scan the QR code or copy the address below to send payment:</p>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ wordBreak: 'break-all' }}>
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </p>
              <p>Amount: {total} USDT</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPaymentComplete}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              I've Sent the Payment
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  )
} 