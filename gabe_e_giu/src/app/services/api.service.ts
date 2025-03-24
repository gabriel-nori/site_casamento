import { apiGet } from '@models/api.model'
import { environment } from '@environment'

export class ApiService<T> {
    url: string = environment.base_url

    public async getData(path: string, params?: Record<string, string>): Promise<T[]> {
        try {
            let api_url = this.url + path
            if(params) {
                const queryString = new URLSearchParams(params).toString();
                api_url += `?${queryString}`
            }
            const response = await fetch(api_url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data: apiGet<T> = await response.json();
            return data.data
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}