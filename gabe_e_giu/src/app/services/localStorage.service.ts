export class LocalStorage {
    public storeData(key: string, data: any): void {
        if (!this.isAvailable()) return;
        localStorage.setItem(key, JSON.stringify(data));
    }

    public retrieveData(key: string): any {
        if (!this.isAvailable()) return {};

        const stored = localStorage.getItem(key);
        if (!stored) return {};

        try {
            const parsed = JSON.parse(stored);
            return parsed;
        } catch (err) {
            console.warn("Failed to parse preferences:", err);
            return {};
        }
    }

    public isAvailable(): boolean {
        return typeof window !== "undefined" && typeof localStorage !== "undefined";
    }
}