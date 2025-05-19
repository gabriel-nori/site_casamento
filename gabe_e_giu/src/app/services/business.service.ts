import { Business } from "@models/business.model";
import { CacheService } from "./cache.service";

export class BusinessService{
    private business_cache: CacheService<Business> = new CacheService("business_list", true, "business.php")

    public async getBusinesses(): Promise<Business[]> {
        return await this.business_cache.getDataAutomatic()
    }
}