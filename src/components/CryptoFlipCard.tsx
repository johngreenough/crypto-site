import { motion } from 'framer-motion'
import { getCryptoLogo } from '../utils/cryptoLogos'
import { cryptoDetails } from '../utils/cryptoDetails'

interface CryptoFlipCardProps {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  onAddToCart: () => void
  amount: string
  onAmountChange: (value: string) => void
  calculateTotal: (price: number, amount: string) => string
  isSelected: boolean
}

export default function CryptoFlipCard({
  id,
  name,
  symbol,
  price,
  change24h,
  onAddToCart,
  amount,
  onAmountChange,
  calculateTotal,
  isSelected
}: CryptoFlipCardProps) {
  const details = cryptoDetails[id.toLowerCase()]

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '1rem',
        border: `2px solid ${isSelected ? '#e60000' : '#0066cc'}`,
        boxShadow: isSelected ? '0 0 10px rgba(230, 0, 0, 0.3)' : '0 0 10px rgba(0, 102, 204, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
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
            src={getCryptoLogo(id)}
            alt={name}
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
            {name} ({symbol})
          </h3>
          <p style={{ 
            margin: '0.25rem 0',
            color: '#0066cc',
            fontSize: '1.1rem'
          }}>
            ${price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
          <p style={{ 
            margin: '0.25rem 0',
            color: change24h >= 0 ? '#4CAF50' : '#f44336',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
          </p>
        </div>
      </div>

      {isSelected && details && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: '1rem' }}
        >
          <p style={{ 
            margin: '0 0 0.5rem 0',
            color: '#0066cc',
            fontSize: '1rem',
            lineHeight: '1.4'
          }}>
            {details.description}
          </p>
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ 
              margin: '0.25rem 0',
              color: '#0066cc',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              Founded: {details.founded}
            </p>
            <p style={{ 
              margin: '0.25rem 0',
              color: '#0066cc',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              {details.marketCap}
            </p>
            <p style={{ 
              margin: '0.25rem 0',
              color: '#0066cc',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              Use Case: {details.useCase}
            </p>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ 
              margin: '0.25rem 0',
              color: '#0066cc',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              Key Features:
            </p>
            <ul style={{ 
              margin: '0.25rem 0',
              paddingLeft: '1.5rem',
              color: '#0066cc',
              fontSize: '0.9rem'
            }}>
              {details.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <motion.input
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="number"
            min="0.001"
            step="0.001"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Amount"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              flex: 1, 
              color: '#0066cc', 
              fontSize: '1.1rem',
              border: '2px solid #0066cc',
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease'
            }}
          />
          <span style={{ display: 'flex', alignItems: 'center', color: '#0066cc', fontSize: '1.1rem' }}>
            {symbol}
          </span>
        </div>
        {amount && (
          <p style={{ 
            margin: '0.5rem 0', 
            fontSize: '1.1rem', 
            color: '#0066cc',
            textAlign: 'right' 
          }}>
            Total: ${calculateTotal(price, amount)}
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation()
          onAddToCart()
        }}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#0066cc',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          fontFamily: "'Cooper Black', serif",
          transition: 'all 0.3s ease'
        }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  )
} 