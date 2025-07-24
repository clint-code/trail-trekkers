import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})

export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {

    this.animateHeroText();
    this.animateDraggableItems();
    this.fadeInUpScrollItems();
    this.fadeInDownScrollItems();
  }

  animateDraggableItems() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    Draggable.create(items, {
      type: 'x,y',
      bounds: ".content-left",
      inertia: true
    });

  }

  animateHeroText() {

    gsap.from(".hero-text-section", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      ease: "power2.out"
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
