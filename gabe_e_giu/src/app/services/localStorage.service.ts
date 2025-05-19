import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
    public storeData(key: string, data: any): void {
        if (!this.isAvailable()) return;
        localStorage.setItem(key, JSON.stringify(data));
    }

    public retrieveData<T>(key: string): T {
        if (!this.isAvailable()) {
            console.log("storage is not available")
            return {} as T;
        } 

        const stored = localStorage.getItem(key);
        if (!stored) return {} as T;

        try {
            const parsed = JSON.parse(stored) as T;
            return parsed;
        } catch (err) {
            console.warn("Failed to parse preferences:", err);
            return {} as T;
        }
    }

    public isAvailable(): boolean {
        return typeof window !== "undefined" && typeof localStorage !== "undefined";
    }
}