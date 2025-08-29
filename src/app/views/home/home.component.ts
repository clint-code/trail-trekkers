import { Component, AfterViewInit, } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';

import { RouterModule } from '@angular/router';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import { NgIf } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

gsap.registerPlugin(SplitText, Draggable);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PreloaderComponent
  ]
})

export class HomeComponent implements AfterViewInit {

  isLoading = false;

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 8000);
  }

  ngAfterViewInit() {

    this.animateIcons();
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

    // SplitText.create(".hero-text-section h1", {
    //   type: "words, chars",
    //   onSplit(self) {
    //     gsap.from(self.chars, {
    //       opacity: 0,
    //       y: 100,
    //       duration: 0.5,
    //       autoAlpha: 0,
    //       ease: "power4",
    //       stagger: 0.05
    //     });
    //   }
    // });

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
