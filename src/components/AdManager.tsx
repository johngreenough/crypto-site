import { useState, useEffect } from 'react'
import CryptoAd from './CryptoAd'

const AD_COINS = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 65432.10,
    change24h: 2.5,
    image: '/src/assets/bitcoin.png'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change24h: -1.2,
    image: '/src/assets/ethereum.png'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 123.45,
    change24h: 5.7,
    image: '/src/assets/solana.png'
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    change24h: 3.2,
    image: '/src/assets/cardano.png'
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 6.78,
    change24h: -2.1,
    image: '/src/assets/polkadot.png'
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 15.67,
    change24h: 4.3,
    image: '/src/assets/chainlink.png'
  }
]

export default function AdManager() {
  const [activeAds, setActiveAds] = useState<Array<{ id: string; coin: typeof AD_COINS[0] }>>([])
  const [nextAdIndex, setNextAdIndex] = useState(0)

  // Function to get a random coin that's not currently shown
  const getNextAd = () => {
    const availableCoins = AD_COINS.filter(coin => 
      !activeAds.some(ad => ad.coin.symbol === coin.symbol)
    )
    
    if (availableCoins.length === 0) {
      // If all coins are shown, start over
      return AD_COINS[Math.floor(Math.random() * AD_COINS.length)]
    }
    
    return availableCoins[Math.floor(Math.random() * availableCoins.length)]
  }

  // Function to handle ad closure
  const handleCloseAd = (id: string) => {
    setActiveAds(prev => prev.filter(ad => ad.id !== id))
    
    // Add a new ad after a short delay
    setTimeout(() => {
      const newCoin = getNextAd()
      setActiveAds(prev => [...prev, { 
        id: Math.random().toString(36).substr(2, 9),
        coin: newCoin
      }])
    }, 500)
  }

  // Initialize with first ad
  useEffect(() => {
    setActiveAds([{
      id: Math.random().toString(36).substr(2, 9),
      coin: AD_COINS[0]
    }])
  }, [])

  return (
    <>
      {activeAds.map(({ id, coin }) => (
        <CryptoAd 
          key={id}
          coin={coin}
          onClose={() => handleCloseAd(id)}
        />
      ))}
    </>
  )
} 