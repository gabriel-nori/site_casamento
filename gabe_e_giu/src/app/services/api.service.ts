import { apiGet, ApiParams, ApiPost } from '@models/api.model'
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

    public async postData(path: string, params: ApiParams): Promise<T> {
        try {
            let api_url = this.url + path
            if(params.query_parameters) {
                const queryString = new URLSearchParams(params.query_parameters).toString();
                api_url += `?${queryString}`
            }
            const response = await fetch(api_url, {
                method: "POST",
                body: JSON.stringify(params.body)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data: T = await response.json();
            return data
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}