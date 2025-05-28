import { LocalData } from "@models/localData.model";
import { CacheService } from "./cache.service";
import { Message } from "@models/message.model";

export class LocalDataService{
    private local_data_cache: CacheService<LocalData> = new CacheService("local_data_cache", false, "", 1234567890)
    private data: LocalData = {}

    constructor(){
        this.loadData()
    }

    private loadData(): void {
        const data = this.local_data_cache.getData()
        if (data) {
            this.data = data[0]
        }
    }

    private storeData(): void {
        this.local_data_cache.update([this.data])
    }

    public getMessage(): Message | undefined {
        const message_from_cache = this.data?.message
        console.log(message_from_cache)
        return undefined
    }

    public storeMessageDraft(message: Message): void {
        this.data.message = message
        console.log("storing message")
        this.storeData
    }
}