interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
}

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    return []
  }
}

export async function fetchCryptoPriceById(id: string): Promise<CryptoPrice | null> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    )
    const data = await response.json()
    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h
    }
  } catch (error) {
    console.error(`Error fetching price for ${id}:`, error)
    return null
  }
} 