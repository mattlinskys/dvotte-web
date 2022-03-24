/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_ORIGIN: string;
    NEXT_PUBLIC_NEW_PROJECT_SLUG_PREFIX: string;
    NEXT_PUBLIC_INFURA_API_KEY: string;
  }
}
