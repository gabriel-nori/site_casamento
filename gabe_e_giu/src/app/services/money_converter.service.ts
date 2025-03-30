export class MoneyConverter {
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
            return parseFloat(value.toFixed(0))
        }
    }
}