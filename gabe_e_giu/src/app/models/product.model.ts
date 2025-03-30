export interface product {
    id: number
    photo_path: string
    name: string
    description: string
    price_cents: number
    category: string
    type: string
    currency?: string
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

export interface ProductFilter {
    tags?: string[]
    id?: number[]
    types?: string[]
    categories?: string[]
    search_term?: string
    order: OrderFilter
    currency?: string
}

export interface OrderKey {
    [key: string]: OrderFilter
}

export interface OrderFilter {
    key: string,
    order: "asc"|"desc"
    name: string
    field_type: "string"|"number",
    default?: boolean
}