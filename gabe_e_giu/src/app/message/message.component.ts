import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../menu/menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MenuConfig } from '@models/menu.model';
import { Message } from '@models/message.model';
import { LocalDataService } from '@services/localData.service';
import { MessageCardComponent } from '../message-card/message-card.component';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-message',
  imports: [
    CommonModule,
    MatIconModule,
    MenuComponent,
    MatButtonModule,
    MessageCardComponent
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  logo_properties: MenuConfig = {
    color: 'marsala',
    background_color: "#f6b1ca",
    hamburger_color: "#440f21"
  }
  message_draft: Message | undefined = undefined
  local_data_cache: LocalDataService = new LocalDataService()
  message_service: MessageService = new MessageService()
  messages: Message[] = []

  async ngOnInit(): Promise<void> {
    // this.local_data_cache.storeMessageDraft({
    //   body: "",
    //   author_email: "",
    //   author_name: "",
    //   timestamp: Date.now(),
    //   title: ""
    // })
    this.message_draft = this.local_data_cache.getMessage()
    this.messages = await this.message_service.getMessages()
  }

}
