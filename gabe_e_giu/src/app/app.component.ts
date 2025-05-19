import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookiePopupComponent } from './cookie-popup/cookie-popup.component';
import { Preferences } from '@services/preferences.service';
import { PreferencesInterface } from '@models/preferences.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatIconModule,
    CookiePopupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'gabe_e_giu';
  menu_open: boolean = false
  preferences: Preferences = new Preferences()
  cookie_display: boolean = false
  pref_data: PreferencesInterface = {}

  ngOnInit(): void {
    this.pref_data = this.preferences.getPreferences()
    this.cookie_display = !("cookie_preferences" in this.pref_data)
  }

  toggle_menu() {
    this.menu_open = !this.menu_open
  }
}
