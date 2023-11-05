import { URL } from 'node:url'

import axios, { type AxiosInstance } from 'axios'

import { config } from '@/Contexts/Mooc/Shared/infrastructure/config/index.js'

type chains = 'ethereum' | 'polygon' | 'bsc' | 'solana' | 'cardano'

export interface Metadata {
  name: string
  image: string
  description: string
  attributes: Attribute[]
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface OnChain {
  status: string
  tokenId: string
  owner: string
  txId: string
  contractAddress: string
  chain: string
}

export enum NativeCurrency {
  'ethereum' = 'ETH',
  'polygon' = 'MATIC',
  'bsc' = 'BNB',
  'solana' = 'SOL',
  'cardano' = 'ADA',
}

type Wallet = { chain: chains; publicKey: string }

type WalletContent = {
  chain: chains
  contractAddress: string
  tokenId: string
  metadata: Metadata
  locator: string
  tokenStandard: string
}

export class AxiosCrossmintWalletRepository {
  #client: AxiosInstance
  constructor(client: AxiosInstance) {
    this.#client = client
  }

  async save(wallet: { email: string; chain: chains }): Promise<Wallet> {
    const { data } = await this.#client.post<Wallet>('/api/v1-alpha1/wallets', wallet)

    return data
  }

  async search(email: string): Promise<Wallet[]> {
    const { data: wallets } = await this.#client.get<Wallet[]>(
      `/api/v1-alpha1/wallets?email=${encodeURIComponent(email)}`
    )
    // const wallet = wallets.find((wallet) => wallet.chain === chain)

    return wallets
  }

  async searchAll(wallet: Wallet, page?: number, limit?: number) {
    const walletUrl = new URL(
      `/api/v1-alpha1/wallets/${wallet?.chain}:${wallet?.publicKey}/nfts`,
      this.#client.defaults.baseURL
    )
    if (typeof page === 'number' && page >= 0) {
      walletUrl.searchParams.append('page', page.toString())
    }
    if (typeof limit === 'number' && limit >= 0) {
      walletUrl.searchParams.append('perPage', limit.toString())
    }

    const { data } = await this.#client.get<WalletContent[]>(walletUrl.href)

    return data
  }
}

export class AxiosNftMintingRepository {
  #client: AxiosInstance
  constructor(client: AxiosInstance) {
    this.#client = client
  }

  // https://mumbai.polygonscan.com/:[address/0x78012f453985E3244fF20D1521D6dA97f5757395]
  // https://mumbai.polygonscan.com/address/0x78012f453985e3244ff20d1521d6da97f5757395
  async mint(email: string, chain: chains, metadata: Metadata) {
    const response = await this.#client.post('/api/2022-06-09/collections/default/nfts', {
      recipient: `email:${email}:${chain}`,
      metadata,
    })
    console.log(response)
  }

  async searchAll(
    collectionId: string = 'default-polygon',
    page: number = 1,
    limit?: number
  ): Promise<{ id: string; metadata: Metadata; onChain: OnChain }[]> {
    const listNftUrl = new URL(`/api/2022-06-09/collections/${collectionId}/nfts`, this.#client.defaults.baseURL)
    if (typeof page === 'number' && page >= 0) {
      listNftUrl.searchParams.append('page', page.toString())
    }
    if (typeof limit === 'number' && limit >= 0) {
      listNftUrl.searchParams.append('perPage', limit.toString())
    }
    const { data } = await this.#client.get(listNftUrl.href)

    return data
  }
}

const walletClient = axios.create({
  baseURL: config.get('crossmint.apiUrl'),
  headers: {
    'Content-Type': 'application/json',
    'X-PROJECT-ID': config.get('crossmint.projectId'),
    'X-CLIENT-SECRET': config.get('crossmint.clientSecret'),
  },
})
const nftMintingClient = axios.create({
  baseURL: config.get('crossmint.apiUrl'),
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    'X-PROJECT-ID': config.get('crossmint.projectId'),
    'X-CLIENT-SECRET': config.get('crossmint.clientSecret'),
  },
})
const walletRepository = new AxiosCrossmintWalletRepository(walletClient)
const nftMintingRepository = new AxiosNftMintingRepository(nftMintingClient)

/**
 * {
    chain: 'polygon',
    publicKey: '0x19e73a7D975FD270b4A1b5bA1C46342510272DEa'
    }
  * srojas+7f46b1ea-b620-4b06-9dee-11a57edc0aa5@domain.com
 */
const currentUser = 'srojas+7f46b1ea-b620-4b06-9dee-11a57edc0aa5@domain.com'

const bootstrap = async () => {
  try {
    // await walletRepository.save({
    //   email: `srojas+${v4()}@domain.com`,
    //   chain: 'polygon',
    // })

    console.log(await walletRepository.search(currentUser))
    console.log(
      await walletRepository.searchAll({
        chain: 'polygon',
        publicKey: '0x19e73a7D975FD270b4A1b5bA1C46342510272DEa',
      })
    )

    // nftMintingRepository.mint('srojas+7f46b1ea-b620-4b06-9dee-11a57edc0aa5@domain.com', 'polygon', {
    //   name: 'Welcome Company NFT!',
    //   image: process.env.DEFAULT_ASSET!,
    //   description: 'Welcome Company NFT!',
    //   attributes: [
    //     {
    //       trait_type: 'background',
    //       value: 'dark',
    //     },
    //     {
    //       trait_type: 'chain',
    //       value: 'polygon',
    //     },
    //     {
    //       trait_type: 'contract',
    //       value: 'TBD',
    //     },
    //     {
    //       trait_type: 'currency',
    //       value: 'MATIC', // Existe relación entre la cadena y la moneda nativa
    //     },
    //   ],
    // })

    console.log(await nftMintingRepository.searchAll('default-polygon'))
  } catch (e) {
    console.log(e)
  }
}

bootstrap()

// cdbf8f1f-50bd-4aeb-81d3-8a86b89281cd
