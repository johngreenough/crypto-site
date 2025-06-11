interface CryptoDetails {
  description: string
  founded: string
  keyFeatures: string[]
  marketCap: string
  useCase: string
}

export const cryptoDetails: Record<string, CryptoDetails> = {
  'bitcoin': {
    description: 'Bitcoin is the first and most well-known cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It introduced the concept of blockchain technology and decentralized digital currency.',
    founded: '2009',
    keyFeatures: [
      'First decentralized cryptocurrency',
      'Limited supply of 21 million coins',
      'Proof-of-work consensus mechanism',
      'Store of value and digital gold'
    ],
    marketCap: 'Largest cryptocurrency by market cap',
    useCase: 'Digital store of value, peer-to-peer payments, and investment'
  },
  'ethereum': {
    description: 'Ethereum is a decentralized platform that enables smart contracts and decentralized applications (dApps) to be built and run without any downtime, fraud, control, or interference from a third party.',
    founded: '2015',
    keyFeatures: [
      'Smart contract functionality',
      'Decentralized applications platform',
      'Ethereum Virtual Machine (EVM)',
      'Transitioning to proof-of-stake'
    ],
    marketCap: 'Second largest cryptocurrency by market cap',
    useCase: 'Smart contracts, DeFi, NFTs, and decentralized applications'
  },
  'binancecoin': {
    description: 'Binance Coin (BNB) is the native cryptocurrency of the Binance ecosystem, one of the largest cryptocurrency exchanges in the world. It powers the Binance Smart Chain and provides utility within the Binance ecosystem.',
    founded: '2017',
    keyFeatures: [
      'Binance Smart Chain integration',
      'Exchange fee discounts',
      'Token burns to reduce supply',
      'Cross-chain compatibility'
    ],
    marketCap: 'Top 5 cryptocurrency by market cap',
    useCase: 'Trading fee discounts, DeFi, and cross-chain transactions'
  },
  'ripple': {
    description: 'Ripple (XRP) is a digital payment protocol and cryptocurrency designed for fast, low-cost international money transfers. It aims to revolutionize cross-border payments and remittances.',
    founded: '2012',
    keyFeatures: [
      'Fast transaction settlement',
      'Low transaction costs',
      'Banking partnerships',
      'Consensus ledger technology'
    ],
    marketCap: 'Top 10 cryptocurrency by market cap',
    useCase: 'Cross-border payments, remittances, and banking solutions'
  },
  'cardano': {
    description: 'Cardano is a third-generation blockchain platform that aims to solve the scalability, interoperability, and sustainability issues faced by earlier blockchain networks.',
    founded: '2017',
    keyFeatures: [
      'Peer-reviewed research approach',
      'Proof-of-stake consensus',
      'Multi-layer architecture',
      'Formal verification'
    ],
    marketCap: 'Top 10 cryptocurrency by market cap',
    useCase: 'Smart contracts, DeFi, and sustainable blockchain solutions'
  },
  'solana': {
    description: 'Solana is a high-performance blockchain platform designed for decentralized applications and marketplaces, known for its extremely fast transaction speeds and low fees.',
    founded: '2020',
    keyFeatures: [
      'Ultra-fast transaction speeds',
      'Low transaction costs',
      'Proof of History consensus',
      'Scalable architecture'
    ],
    marketCap: 'Top 10 cryptocurrency by market cap',
    useCase: 'DeFi, NFTs, and high-throughput applications'
  },
  'polkadot': {
    description: 'Polkadot is a multi-chain platform that enables different blockchains to transfer messages and value in a trust-free fashion, aiming to create a fully decentralized web.',
    founded: '2020',
    keyFeatures: [
      'Cross-chain interoperability',
      'Parachain architecture',
      'Shared security model',
      'Scalable multi-chain network'
    ],
    marketCap: 'Top 15 cryptocurrency by market cap',
    useCase: 'Cross-chain communication, interoperability, and decentralized applications'
  },
  'dogecoin': {
    description: 'Dogecoin started as a meme cryptocurrency but has evolved into a popular digital currency with a strong community. It features the Shiba Inu dog from the "Doge" meme as its logo.',
    founded: '2013',
    keyFeatures: [
      'Fast transaction times',
      'Low transaction fees',
      'Strong community support',
      'Inflationary supply'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Tipping, charitable donations, and community-driven projects'
  },
  'chainlink': {
    description: 'Chainlink is a decentralized oracle network that enables smart contracts to securely access off-chain data feeds, web APIs, and traditional bank payments.',
    founded: '2017',
    keyFeatures: [
      'Decentralized oracle network',
      'Real-world data integration',
      'Secure data feeds',
      'Cross-chain compatibility'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Smart contract data feeds, DeFi price feeds, and oracle services'
  },
  'polygon': {
    description: 'Polygon (formerly Matic) is a Layer 2 scaling solution for Ethereum that aims to provide faster and cheaper transactions while maintaining security.',
    founded: '2017',
    keyFeatures: [
      'Ethereum scaling solution',
      'Low transaction fees',
      'Fast transaction speeds',
      'Multiple scaling technologies'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Ethereum scaling, DeFi, and NFT applications'
  },
  'tether': {
    description: 'Tether (USDT) is a stablecoin that aims to maintain a 1:1 peg with the US dollar. It is one of the most widely used stablecoins in the cryptocurrency market, providing stability and liquidity.',
    founded: '2014',
    keyFeatures: [
      '1:1 USD peg',
      'High liquidity',
      'Wide exchange support',
      'Multiple blockchain support'
    ],
    marketCap: 'Top 3 cryptocurrency by market cap',
    useCase: 'Stable value storage, trading pairs, and liquidity provision'
  },
  'usd-coin': {
    description: 'USD Coin (USDC) is a regulated stablecoin that is fully backed by US dollar assets. It is issued by regulated financial institutions and provides transparency through regular audits.',
    founded: '2018',
    keyFeatures: [
      'Regulated stablecoin',
      'Full USD backing',
      'Regular audits',
      'Multiple blockchain support'
    ],
    marketCap: 'Top 10 cryptocurrency by market cap',
    useCase: 'Stable value storage, DeFi, and institutional crypto services'
  },
  'tron': {
    description: 'TRON is a blockchain platform focused on entertainment and content sharing. It aims to create a decentralized internet where content creators can directly monetize their work.',
    founded: '2017',
    keyFeatures: [
      'High throughput',
      'Low transaction fees',
      'Content sharing focus',
      'Smart contract support'
    ],
    marketCap: 'Top 15 cryptocurrency by market cap',
    useCase: 'Content sharing, entertainment, and decentralized applications'
  },
  'staked-ether': {
    description: 'Staked Ether (stETH) is a token representing staked ETH in the Lido protocol. It allows users to earn staking rewards while maintaining liquidity of their ETH position.',
    founded: '2020',
    keyFeatures: [
      'ETH staking rewards',
      'Liquid staking',
      'Lido protocol integration',
      'Yield generation'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'ETH staking, yield generation, and DeFi integration'
  },
  'hyperliquid': {
    description: 'Hyperliquid is a decentralized exchange protocol focused on providing efficient and secure trading of digital assets with advanced financial instruments.',
    founded: '2023',
    keyFeatures: [
      'Decentralized exchange',
      'Advanced trading features',
      'High performance',
      'Security focused'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Decentralized trading and financial instruments'
  },
  'wrapped-bitcoin': {
    description: 'Wrapped Bitcoin (WBTC) is an ERC-20 token backed 1:1 by Bitcoin. It brings Bitcoin\'s liquidity to the Ethereum ecosystem, enabling BTC holders to participate in DeFi.',
    founded: '2019',
    keyFeatures: [
      '1:1 BTC backing',
      'Ethereum compatibility',
      'DeFi integration',
      'Transparent reserves'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Bitcoin DeFi integration and cross-chain liquidity'
  },
  'wrapped-steth': {
    description: 'Wrapped Staked Ether (wstETH) is a wrapped version of stETH that provides additional functionality and integration capabilities in the DeFi ecosystem.',
    founded: '2021',
    keyFeatures: [
      'Staked ETH exposure',
      'DeFi integration',
      'Yield generation',
      'Liquidity provision'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Staked ETH DeFi integration and yield strategies'
  },
  'sui': {
    description: 'Sui is a high-performance Layer 1 blockchain platform designed for the next generation of web3 applications, focusing on scalability and developer experience.',
    founded: '2023',
    keyFeatures: [
      'High throughput',
      'Low latency',
      'Move programming language',
      'Parallel transaction processing'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Web3 applications, DeFi, and high-performance dApps'
  },
  'avalanche-2': {
    description: 'Avalanche is a high-performance blockchain platform that offers fast, low-cost transactions and supports multiple custom blockchain networks.',
    founded: '2020',
    keyFeatures: [
      'High throughput',
      'Low fees',
      'Custom blockchain networks',
      'EVM compatibility'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'DeFi, NFTs, and custom blockchain solutions'
  },
  'bitcoin-cash': {
    description: 'Bitcoin Cash is a cryptocurrency that was created as a fork of Bitcoin to increase the block size limit, allowing for more transactions per block and lower fees.',
    founded: '2017',
    keyFeatures: [
      'Larger block size',
      'Lower fees',
      'Fast transactions',
      'Bitcoin fork'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Peer-to-peer electronic cash and payments'
  },
  'stellar': {
    description: 'Stellar is an open-source, decentralized payment protocol that enables fast, cross-border transactions between any pair of currencies.',
    founded: '2014',
    keyFeatures: [
      'Fast cross-border payments',
      'Multi-currency support',
      'Low transaction costs',
      'Built-in exchange'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Cross-border payments, remittances, and currency exchange'
  },
  'leo-token': {
    description: 'LEO Token is the native cryptocurrency of the Bitfinex exchange, providing utility and benefits to users of the platform.',
    founded: '2019',
    keyFeatures: [
      'Exchange utility token',
      'Fee discounts',
      'Token burns',
      'Platform integration'
    ],
    marketCap: 'Top 20 cryptocurrency by market cap',
    useCase: 'Exchange utility, fee discounts, and platform benefits'
  }
} 