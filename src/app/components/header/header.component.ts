import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

import { FaIconLibrary, FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCompass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FaIconComponent
  ],

})
export class HeaderComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faCompass
    );
  }

  isMobileMenuOpen = false;

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // const menu = this.document.getElementById('side-menu');

    // if (menu) {
    //   menu.classList.toggle('-translate-x-full');
    // }

  }

}
