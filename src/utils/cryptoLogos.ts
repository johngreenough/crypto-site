// Import all crypto logos
import bitcoinLogo from '../assets/logos/bitcoin.png'
import ethereumLogo from '../assets/logos/ethereum.png'
import tetherLogo from '../assets/logos/tether.png'
import rippleLogo from '../assets/logos/ripple.png'
import binanceLogo from '../assets/logos/binancecoin.png'
import solanaLogo from '../assets/logos/solana.png'
import usdcLogo from '../assets/logos/usd-coin.png'
import dogecoinLogo from '../assets/logos/dogecoin.png'
import tronLogo from '../assets/logos/tron.png'
import cardanoLogo from '../assets/logos/cardano.png'
import stethLogo from '../assets/logos/staked-ether.png'
import hyperliquidLogo from '../assets/logos/hyperliquid.png'
import wbtcLogo from '../assets/logos/wrapped-bitcoin.png'
import wstethLogo from '../assets/logos/wrapped-steth.png'
import suiLogo from '../assets/logos/sui.png'
import chainlinkLogo from '../assets/logos/chainlink.png'
import avalancheLogo from '../assets/logos/avalanche-2.png'
import bitcoinCashLogo from '../assets/logos/bitcoin-cash.png'
import stellarLogo from '../assets/logos/stellar.png'
import leoTokenLogo from '../assets/logos/leo-token.png'

// Map of crypto IDs to their logo imports
export const cryptoLogos: { [key: string]: string } = {
  'bitcoin': bitcoinLogo,
  'ethereum': ethereumLogo,
  'tether': tetherLogo,
  'ripple': rippleLogo,
  'binancecoin': binanceLogo,
  'solana': solanaLogo,
  'usd-coin': usdcLogo,
  'dogecoin': dogecoinLogo,
  'tron': tronLogo,
  'cardano': cardanoLogo,
  'staked-ether': stethLogo,
  'hyperliquid': hyperliquidLogo,
  'wrapped-bitcoin': wbtcLogo,
  'wrapped-steth': wstethLogo,
  'sui': suiLogo,
  'chainlink': chainlinkLogo,
  'avalanche-2': avalancheLogo,
  'bitcoin-cash': bitcoinCashLogo,
  'stellar': stellarLogo,
  'leo-token': leoTokenLogo
}

// Function to get logo for a crypto ID
export const getCryptoLogo = (id: string): string => {
  return cryptoLogos[id] || ''
} 