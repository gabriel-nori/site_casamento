export interface cartInterface {
    total: number,
    item_count: number,
    items: {
        [key: string]: {
            id: number
            photo_path: string
            name: string
            description: string
            price_cents: number
            category: string
            type: string
            quantity: number
            total_cents: number
        }
    }
}