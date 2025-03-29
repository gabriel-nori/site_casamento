export interface product {
    id: number
    photo_path: string
    name: string
    description: string
    price_cents: number
    category: string
    type: string
}

export interface Categories {
    [key: string]: string[]
}

export interface Types {
    [key: string]: string[]
}

export interface Tags {
    name: string,
    products: number[]
}