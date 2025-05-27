import { Client } from "./client.model"

export interface PreferencesInterface {
    currency?: string
    cookie_preferences?: CookiePreferences
    client?: Client
}

export interface CookiePreferences {
    accepted: boolean
    confirmed: boolean
    type: "necessary"|"all"|"configurations"
    updated_date: number
}