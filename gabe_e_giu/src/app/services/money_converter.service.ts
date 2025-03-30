export class MoneyConverter {
    private currencies: {name: string, factor: number}[] = [
        {
            name: "R$",
            factor: 1
        },
        {
            name: "USD",
            factor: 5.5
        }
    ]

    public getCurrencies(): string[] {
        let currencies: string[] = []
        for (const key in this.currencies) {
            currencies.push(this.currencies[key].name)
        }
        return currencies
    }

    public convert(value: number, to: string): number {
        return value
    }
}