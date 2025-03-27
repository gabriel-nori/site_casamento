import { Loader } from '@services/loader.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [Loader],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  constructor(protected loader: Loader) { }
}
