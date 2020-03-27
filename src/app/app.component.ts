import { Router } from '@angular/router';
import { ToastyConfig } from 'ng2-toasty';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
    ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }
}
