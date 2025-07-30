/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // Add more env variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}