import { PreferencesInterface } from "@models/preferences.model";

export class Preferences {
    key: string = "preferences_storage"
    data: PreferencesInterface = {}

    constructor(){
        this.retrieveData()
    }

    public updateProperties(data: PreferencesInterface) {
        this.data = data
        this.storeData()
    }

    public updateProperty(data:{key: string, value: any}) {
        this.data[data.key as keyof typeof this.data] = data.value
        this.storeData()
    }

    public getPreferences(): PreferencesInterface {
        return this.data
    }

    private storeData(): void {
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    private retrieveData(): PreferencesInterface {
        const stored_data = localStorage.getItem(this.key)
        if (!stored_data) {
            return {}
        }
        const data: PreferencesInterface = JSON.parse(stored_data)
        this.data = data
        return data
    }
}