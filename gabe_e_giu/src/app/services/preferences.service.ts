import { PreferencesInterface } from "@models/preferences.model";
import { LocalStorage } from "./localStorage.service";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class Preferences {
    private key: string = "preferences_storage";
    private data: PreferencesInterface = {};
    private storage: LocalStorage = new LocalStorage()

    constructor() {
        if (this.isStorageAvailable()) {
            this.retrieveData();
        }
    }

    public updateProperties(data: PreferencesInterface): void {
        this.data = { ...data };
        this.storeData();
    }

    public updateProperty(data: { key: string; value: any }): void {
        this.data[data.key as keyof PreferencesInterface] = data.value;
        this.storeData();
    }

    public getPreferences(): PreferencesInterface {
        this.retrieveData()
        return this.data;
    }

    public getKeyValue(key: string, fallback?: any): any {
        const data = this.retrieveData();
        if (key in data) {
            return data[key as keyof PreferencesInterface];
        }
        if (fallback !== undefined) {
            return fallback;
        }
        throw new Error(`Key "${key}" was not found and no fallback was provided.`);
    }

    private storeData(): void {
        this.storage.storeData(this.key, this.data)
    }

    private retrieveData(): PreferencesInterface {
        this.data = this.storage.retrieveData<PreferencesInterface>(this.key)
        return this.data
    }

    private isStorageAvailable(): boolean {
        return typeof window !== "undefined" && typeof localStorage !== "undefined";
    }
}
