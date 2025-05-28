import { Message } from "@models/message.model";
import { CacheService } from "./cache.service";

export class MessageService {
    private message_cache: CacheService<Message> = new CacheService("message_list", true, "messages.php")

    public async getMessages(): Promise<Message[]> {
        return await this.message_cache.getDataAutomatic()
    }

    public async postMessage(message: Message): Promise<boolean> {
        const success: boolean = true
        if (success) {
            this.message_cache.appendItem(message)
            return true
        }
        return false
    }
}