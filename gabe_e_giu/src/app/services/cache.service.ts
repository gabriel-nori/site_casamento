import { cache } from '@models/cache.model'
import { ApiService } from '@api'
import { environment } from '@environment'
import { LocalStorage } from './localStorage.service'

export class CacheService<T> {
    private cache: cache<T> = {data:[], timestamp: 0}
    private default_duration: number = environment.default_cache_time_seconds
    private storage: LocalStorage = new LocalStorage()
    private duration: number = 0
    private api: null|ApiService<T> = null
    private default_path: string = ""
    private cache_key: string = ""

    constructor(
        key: string,
        uses_api: boolean = false,
        path?: string,
        duration?: number
    ) {
        this.cache_key = "cache_" + key
        this.retrieveData()

        if(duration) {
            this.duration = duration
        }
        else {
            this.duration = this.default_duration
        }
        
        if(uses_api){
            this.api = new ApiService<T>()
        }

        if(path) {
            this.default_path = path
        }
    }

    private getTimestamp(): number {
        return Date.now()
    }

    public isValid(): boolean {
        // const expiration_time = this.getTimestamp() + this.duration
        return (
            this.cache.timestamp != 0 &&
            this.cache.timestamp + this.duration >= this.getTimestamp()
        )
    }

    public update(data: T[]): T[] {
        this.cache.data = data
        this.cache.timestamp = this.getTimestamp()
        this.storeData()
        return this.cache.data
    }

    public async updateFromServer(path?: string): Promise<T[]> {
        let api_path: string = ""
        if(!path){
            api_path = this.default_path
        }
        else {
            api_path = path
        }

        if(!this.api) {
            console.error('Service is not configured to use API')
        }

        if(api_path === "") {
            console.error('API path is not configured correctly')
        }

        return this.update(await this.api?.getData(api_path) ?? [])
    }

    public getData(): T[] {
        return this.cache.data
    }

    public async getDataAutomatic(): Promise<T[]> {
        if(this.isValid()){
            return Promise.resolve(this.cache.data)
        }
        return await this.updateFromServer()
    }

    public invalidate(): void {
        this.cache.data = []
        this.cache.timestamp = 0
    }


    private storeData(): void {
        this.storage.storeData(this.cache_key, this.cache.data);  // Store data in localStorage
    }
      
    private retrieveData(): cache<T> {
        const stored_data = this.storage.retrieveData<cache<T>>(this.cache_key)
        if(!stored_data) {
            return {data:[], timestamp: 0}
        }
        this.cache = stored_data
        return stored_data
    }

    public appendItem(item: T): void {
        this.cache.data.push(item)
        this.storeData()
    }
}