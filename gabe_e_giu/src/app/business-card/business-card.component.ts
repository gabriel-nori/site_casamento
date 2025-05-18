import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Business } from '@models/business.model';

@Component({
  selector: 'app-business-card',
  imports: [
    CommonModule
  ],
  templateUrl: './business-card.component.html',
  styleUrl: './business-card.component.css'
})
export class BusinessCardComponent implements OnInit{

  @Input() business: Business = {
    category: "",
    instagram_url: "",
    name: "",
    phone: "",
    whatsapp: ""
  }

  protected whatsapp_link = ""
  protected phone_link = ""
  protected maps_link = ""
  private numberPattern = /\d+/g;

  ngOnInit(){
    let whatsapp_number = this.business.whatsapp.match(this.numberPattern)
    let phone_number = this.business.phone.match(this.numberPattern)
    
    if (whatsapp_number?.length){
      this.whatsapp_link = `https://wa.me/${whatsapp_number.join("")}`
    }

    if (phone_number?.length){
      this.phone_link = `tel:+${phone_number.join("")}`
    }

    if (this.business.address){
      this.maps_link = `https://www.google.com/maps/place/${this.business.address.split(" ").join()}`
    }
  }
}
