import { Business } from "@models/business.model";
import { CacheService } from "./cache.service";

export class BusinessService{
    private business_cache: CacheService<Business> = new CacheService("business_list", true, "businesses.php")

    public async getBusinesses(): Promise<Business[]> {
        // return await this.business_cache.getDataAutomatic()
        let list: Business[] = [
            {
                category: "cabelo",
                instagram_url: "https://instagram.com/asassasas",
                name: "Fulana cabelos",
                phone: "+55 (11) 91829-1829",
                whatsapp: "+55 (11) 91829-1829",
                address: "R. Duque de Caxias, 93, mogi das cruzes",
                cover_image: "https://s2-gshow.glbimg.com/wGhlVyZPDpajzRAVG_Y7ftzcCmI=/0x0:602x361/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2023/V/2/rJDLTHRgOymrpMYwfAAw/elseve-pure-materia-07.jpg"
            }
        ]
        return Promise.resolve(list)
    }
}