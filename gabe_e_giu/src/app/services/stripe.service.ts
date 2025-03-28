import { environment } from "@environment";
import { PaymentIntent } from "@models/stripe.model";

export class StripeService {
    private stripe_url: string = "https://api.stripe.com/v1/payment_intents"
    public async createPaymentIntent(
        details: Record<string, string>
    ): Promise<PaymentIntent> {
        const formData = new URLSearchParams(details).toString();
        try {
            const response = await fetch(this.stripe_url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${environment.stripe_client_secret}`, // Encode API key in Base64
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data: PaymentIntent = await response.json();
            return data
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}