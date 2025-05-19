import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CookiePreferences } from '@models/preferences.model';
import { Preferences } from '@services/preferences.service';

@Component({
  selector: 'app-cookie-popup',
  imports: [
    CommonModule
  ],
  templateUrl: './cookie-popup.component.html',
  styleUrl: './cookie-popup.component.css'
})
export class CookiePopupComponent {
  private preferences: Preferences = new Preferences()
  protected visible: boolean = true

  protected close_popup() {
    const cookie_settings: CookiePreferences = {
      accepted: true,
      confirmed: true,
      type: 'all',
      updated_date: Date.now()
    }
    this.preferences.updateProperty(
      {
        key: "cookie_preferences",
        value: cookie_settings
      }
    )
    this.visible = false
  }
}
