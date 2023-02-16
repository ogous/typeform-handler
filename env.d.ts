export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'test' | 'development' | 'production'
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      NEXT_PUBLIC_ETH_CHAIN: string
      ALCHEMY_KEY: string
      DATABASE_URL: string
    }
  }
}
