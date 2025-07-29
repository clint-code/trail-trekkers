import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import { RouterModule } from '@angular/router';

gsap.registerPlugin(SplitText, Draggable);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ]
})

export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {

    this.animateIcons();
    this.animateHeroText();
    this.animateDraggableItems();
    this.fadeInUpScrollItems();
    this.fadeInDownScrollItems();
  }

  animateDraggableItems() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    console.log("Items:", items);

    Draggable.create(items, {
      type: 'x,y',
      bounds: ".content-left",
      inertia: true
    });

  }

  animateIcons() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    gsap.from(items, {
      opacity: 0,
      y: 200,
      duration: 5,
      delay: 1,
      rotation: 360,
      ease: "elastic"
    });

  }

  animateHeroText() {

    SplitText.create(".hero-text-section h1", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          opacity: 0,
          y: 100,
          duration: 0.5,
          autoAlpha: 0,
          ease: "power4",
          stagger: 0.05
        });
      }
    });

  }

  fadeInUpScrollItems() {

    gsap.from(".scroll-top", {
      opacity: 0,
      y: -200,
      duration: 3.5,
      delay: 1,
      ease: "power2.out"
    });

  }

  fadeInDownScrollItems() {

    gsap.from(".scroll-reverse", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      ease: "power2.out"
    });

  }


}
