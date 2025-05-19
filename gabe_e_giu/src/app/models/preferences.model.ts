export interface PreferencesInterface {
    currency?: string
    cookie_preferences?: CookiePreferences
}

export interface CookiePreferences {
    accepted: boolean
    confirmed: boolean
    type: "necessary"|"all"|"configurations"
    updated_date: number
}