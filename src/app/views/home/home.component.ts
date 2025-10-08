import { Component, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';

import { FaIconComponent, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';

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
    PreloaderComponent,
  ]
})

export class HomeComponent implements AfterViewInit {

  imagesLoaded: boolean = false;
  siteImages: any = [];

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faPersonHiking
    );
  }


  ngOnInit() {

    this.document.documentElement.scrollTop = 0;

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
    }, 1000);

    this.animateIcons();
    this.autoRotateIcons();
    this.dragBadgeOverText();
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

  dragBadgeOverText() {

    const badge = gsap.utils.toArray('.rotating-badge') as HTMLElement[];

    Draggable.create(badge, {
      type: 'x,y',
      onDragEnd: function () {
        const target = document.getElementById('target-text')?.getBoundingClientRect();
        const draggable = this['target'].getBoundingClientRect();

        const isOverlapping = !(
          draggable.right < (target?.left || 0) ||
          draggable.left > (target?.right || 0) ||
          draggable.bottom < (target?.top || 0) ||
          draggable.top > (target?.bottom || 0)
        );

        if (isOverlapping) {
          gsap.to("#target-text", {
            duration: 0.1,
            color: "#219ebc", // Change to blue
            ease: "power1.out"
          });
        } else {
          gsap.to("#target-text", {
            duration: 0.4,
            color: "#f97316", // Change back to original color
            ease: "power2.out"
          });
        }
      }

    });

  }

  animateIcons() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    gsap.from(items, {
      opacity: 0,
      y: 200,
      duration: 5,
      bounds: '.content-left',
      delay: 1,
      rotation: 360,
      ease: "power3"
    });

  }


  autoRotateIcons() {

    gsap.to(".rotating-compass", {
      duration: 10,
      rotation: 360,
      type: "rotation",
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%"
    });

    gsap.to(".rotating-badge", {
      duration: 10,
      rotation: -360,
      type: "rotation",
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
