import { Preferences } from "./preferences.service"

export class MoneyConverter {
    private preferences: Preferences = new Preferences()
    private currencies: {[key: string]: {name: string, factor: number}} = {
        "R$": {
            name: "R$",
            factor: 1
        },
        "USD": {
            name: "USD",
            factor: 5.5
        }
    }

    public getCurrencies(): string[] {
        let currencies: string[] = []
        for (const key in this.currencies) {
            currencies.push(this.currencies[key].name)
        }
        return currencies
    }

    public convert(value: number, to?: string): number {
        if(!to){
            return value
        }
        else {
            value = value/this.currencies[to as keyof typeof this.currencies].factor
            return parseFloat(value.toFixed(2))
        }
    }

    public autoConvert(value: number): number {
        return this.convert(value, this.preferences.getPreferences().currency ?? "R$")
    }

    public autoString(value: number): string {
        let currency = this.preferences.getPreferences().currency ?? "R$"
        const converted = this.convert(value, currency).toLocaleString(currency == "R$" ? "en-US" : "pt-BR", {
            style: 'currency',
            currency: currency == "R$" ? 'BRL' : 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        // return `${currency} ${this.convert(value, currency)}`
        return converted
    }
}