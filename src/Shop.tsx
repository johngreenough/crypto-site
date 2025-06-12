import { useEffect, useState } from 'react'
import { fetchCryptoPrices } from './services/cryptoService'
import { motion, AnimatePresence } from 'framer-motion'
import SkyBackground from './components/SkyBackground'
import Toast from './components/Toast'
import CryptoFlipCard from './components/CryptoFlipCard'

interface CryptoItem {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
}

interface CartItem extends CryptoItem {
  amount: number
  totalPrice: number
}

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'change-asc' | 'change-desc'

// Add transition variants for consistent animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

const LoadingSkeleton = () => (
  <div style={{ 
    display: 'grid', 
    gap: '1rem', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  }}>
    {[...Array(6)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        style={{
          padding: '1rem',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#e0e0e0',
            animation: 'pulse 1.5s infinite'
          }} />
          <div style={{
            width: '150px',
            height: '24px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            animation: 'pulse 1.5s infinite'
          }} />
        </div>
        <div style={{
          width: '100px',
          height: '32px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          animation: 'pulse 1.5s infinite'
        }} />
        <div style={{
          width: '80px',
          height: '24px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          animation: 'pulse 1.5s infinite'
        }} />
        <div style={{
          width: '100%',
          height: '40px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginTop: 'auto',
          animation: 'pulse 1.5s infinite'
        }} />
      </motion.div>
    ))}
  </div>
)

// Add keyframes for the pulse animation
const pulseKeyframes = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
  }
`

export default function Shop({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const [items, setItems] = useState<CryptoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showOnlyInCart, setShowOnlyInCart] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const prices = await fetchCryptoPrices()
        setItems(prices.map(price => ({
          id: price.id,
          name: price.name,
          symbol: price.symbol.toUpperCase(),
          price: price.current_price,
          change24h: price.price_change_percentage_24h
        })))
        setError(null)
      } catch (err) {
        setError('Failed to load crypto prices')
      } finally {
        setLoading(false)
      }
    }

    loadPrices()
    const interval = setInterval(loadPrices, 30000)

    return () => clearInterval(interval)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFilters(false)
        setSelectedItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Add to cart and update local cart state
  const handleAddToCart = (item: CryptoItem) => {
    const amount = parseFloat(amounts[item.id] || '1')
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount')
      return
    }
    const totalPrice = item.price * amount
    const cartItem: CartItem = { ...item, amount, totalPrice }
    setCart(prev => {
      // If already in cart, update amount and totalPrice
      const existing = prev.find(ci => ci.id === item.id)
      if (existing) {
        return prev.map(ci => ci.id === item.id ? { ...ci, amount: ci.amount + amount, totalPrice: (ci.amount + amount) * ci.price } : ci)
      }
      return [...prev, cartItem]
    })
    onAddToCart(cartItem)
    setAmounts(prev => ({ ...prev, [item.id]: '' }))
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })
    setToastMessage(`Added ${formattedAmount} ${item.symbol} to cart`)
    setShowToast(true)
  }

  const handleAmountChange = (id: string, value: string) => {
    setAmounts(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSortBy('name')
    setPriceRange({ min: 0, max: Infinity })
    setShowFilters(false)
    setShowOnlyInCart(false)
  }

  const calculateTotal = (price: number, amount: string) => {
    const numAmount = parseFloat(amount) || 0
    return (price * numAmount).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    })
  }

  // Filtered and sorted items
  let filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max
      const matchesCart = !showOnlyInCart || cart.some(ci => ci.id === item.id)
      return matchesSearch && matchesPrice && matchesCart
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'change-asc':
          return a.change24h - b.change24h
        case 'change-desc':
          return b.change24h - a.change24h
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <>
        <SkyBackground />
        <style>{pulseKeyframes}</style>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ 
            color: '#e60000',
            fontFamily: "'Bangers', cursive",
            fontSize: '6rem',
            marginBottom: '1.5rem',
            letterSpacing: '2px',
            textAlign: 'center',
            padding: '2rem 0',
            textShadow: '2px 2px 0px #000',
            WebkitTextStroke: '1px black'
          }}>Corner Store Crypto</h1>
        </motion.div>
        <LoadingSkeleton />
      </>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#f44336' }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <>
      <SkyBackground />
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ 
          color: '#e60000',
          fontFamily: "'Bangers', cursive",
          fontSize: '6rem',
          marginBottom: '1.5rem',
          letterSpacing: '2px',
          textAlign: 'center',
          padding: '2rem 0',
          textShadow: '2px 2px 0px #000',
          WebkitTextStroke: '1px black'
        }}>Corner Store Crypto</h1>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto 2rem',
          padding: '0 1rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <motion.div 
          style={{ flex: 1, minWidth: '200px' }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1.1rem',
              border: '2px solid #0066cc',
              borderRadius: '4px',
              fontFamily: "'Cooper Black', serif",
              transition: 'all 0.3s ease'
            }}
          />
        </motion.div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{
              padding: '0.75rem',
              fontSize: '1.1rem',
              border: '2px solid #0066cc',
              borderRadius: '4px',
              fontFamily: "'Cooper Black', serif",
              backgroundColor: 'white',
              color: '#0066cc',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#0052a3'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#0066cc'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="change-asc">Change: Low to High</option>
            <option value="change-desc">Change: High to Low</option>
          </select>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontFamily: "'Cooper Black', serif"
            }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleResetFilters}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#e60000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontFamily: "'Cooper Black', serif"
            }}
          >
            Reset Filters
          </motion.button>
          <motion.label 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontFamily: "'Cooper Black', serif", 
              color: '#0066cc', 
              fontSize: '1.1rem', 
              cursor: 'pointer' 
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              checked={showOnlyInCart}
              onChange={() => setShowOnlyInCart(v => !v)}
              style={{ 
                accentColor: '#e60000', 
                width: '1.1rem', 
                height: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
            Show Only In Cart
          </motion.label>
        </div>
      </motion.div>

      {/* Price Range Filter */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: '1200px',
              margin: '0 auto 2rem',
              padding: '1rem',
              border: '2px solid #0066cc',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              overflow: 'hidden'
            }}
          >
            <h3 style={{ 
              margin: '0 0 1rem 0',
              color: '#0066cc',
              fontSize: '1.3rem',
              fontFamily: "'Cooper Black', serif"
            }}>Price Range</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <motion.input
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="number"
                placeholder="Min Price"
                value={priceRange.min || ''}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                style={{
                  padding: '0.75rem',
                  fontSize: '1.1rem',
                  border: '2px solid #0066cc',
                  borderRadius: '4px',
                  fontFamily: "'Cooper Black', serif",
                  transition: 'all 0.3s ease'
                }}
              />
              <span style={{ color: '#0066cc', fontSize: '1.2rem' }}>to</span>
              <motion.input
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="number"
                placeholder="Max Price"
                value={priceRange.max === Infinity ? '' : priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
                style={{
                  padding: '0.75rem',
                  fontSize: '1.1rem',
                  border: '2px solid #0066cc',
                  borderRadius: '4px',
                  fontFamily: "'Cooper Black', serif",
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {filteredAndSortedItems.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              custom={index}
              style={{
                height: '100%',
                minHeight: '300px'
              }}
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <CryptoFlipCard
                id={item.id}
                name={item.name}
                symbol={item.symbol}
                price={item.price}
                change24h={item.change24h}
                onAddToCart={() => handleAddToCart(item)}
                amount={amounts[item.id] || ''}
                onAmountChange={(value) => handleAmountChange(item.id, value)}
                calculateTotal={calculateTotal}
                isSelected={selectedItem === item.id}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </>
  )
} 