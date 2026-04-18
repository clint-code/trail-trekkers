import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

import { FaIconLibrary, FaIconComponent, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCompass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
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

  isMobileMenuOpen: boolean = false;
  isRotated: boolean = false;
  isOverlayVisible: boolean = false;

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isOverlayVisible = !this.isOverlayVisible;
    this.rotateIconOnClick();
  }

  rotateIconOnClick() {
    this.isRotated = !this.isRotated;
  }

}
