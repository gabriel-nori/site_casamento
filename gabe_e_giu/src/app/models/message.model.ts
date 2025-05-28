import { Client } from "./client.model";

export interface Message {
    author_name: string
    author_email: string
    timestamp: number
    title: string
    body: string
}