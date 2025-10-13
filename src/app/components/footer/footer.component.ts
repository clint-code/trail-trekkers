import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]

})

export class FooterComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    this.rotateLogo();


  }

  rotateLogo() {

    const logo = document.querySelector('.trail-trekkers-logo') as HTMLElement;

    Draggable.create(logo, {
      type: "rotation",
      inertia: true,
    });
  }

}
