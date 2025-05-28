import { Component, Input } from '@angular/core';
import { Message } from '@models/message.model';

@Component({
  selector: 'app-message-card',
  imports: [],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent {
  @Input() message: Message = {
    body: "",
    author_email: "",
    author_name: "",
    timestamp: 1234,
    title: ""
  }
}
