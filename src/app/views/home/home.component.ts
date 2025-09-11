import { Component, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';

import { RouterModule } from '@angular/router';
import { Preloader } from '../../utils/preloader';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';

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

  imagesLoaded: boolean = false;
  siteImages: any = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }


  ngOnInit() {

    this.document.documentElement.scrollTop = 0;

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
    }, 1000);

    this.animateIcons();
    this.rotateIcon();
    this.animateHeroText();
    this.animateDraggableItems();
    this.fadeInUpScrollItems();
    this.fadeInDownScrollItems();
  }

  animateDraggableItems() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    gsap.set(items, {
      xPercent: 0,
      yPercent: 0
    });

    Draggable.create(items, {
      type: 'x,y',
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
      ease: "power2.out"
    });

  }


  rotateIcon() {

    // const item = gsap.utils.toArray('#compass-icon') as HTMLElement[];

    gsap.to(".rotating-compass", {
      duration: 5,
      rotation: 360,
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%"
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

  handleSiteLoaded() {

    this.imagesLoaded = true;
  }


}
