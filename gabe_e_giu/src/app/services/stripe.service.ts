import { environment } from "@environment";
import { PaymentIntent } from "@models/stripe.model";
import { ApiService } from "./api.service";

export class StripeService {
    private api: ApiService<PaymentIntent> = new ApiService<PaymentIntent>()

    public async createPaymentIntent(
        details: {amount: number, currency: string}
    ): Promise<PaymentIntent> {
        const data =  await this.api.postData("payment_intent.php", {
            body: details,
            headers: {},
        })
        return data
    }
}