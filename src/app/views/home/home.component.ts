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
  badges: any = [];
  colors: string[] = ['#2f7db6', '#004aad', '#e61a23', '#266b5a'];

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
    this.badges = this.document.querySelectorAll('.rotating-badge');

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

    const target = document.getElementById('target-text');

    this.badges.forEach((badge: any, i: any) => {

      const badgeColor = this.colors[i % this.colors.length];

      console.log("Badge:", badge, "Color:", badgeColor);

      Draggable.create(badge, {
        onPress: () => {
          gsap.to(badge, {
            duration: 0.5,
            scale: 1.25,
            zIndex: 1000,
          });
          gsap.to(
            this.badges, {
            duration: 0.2,
          });
        },

        onRelease: () => {
          gsap.to(badge, { duration: 0.4, scale: 1.0 });
        },

        onDrag: () => {

          const badgeRect = badge.getBoundingClientRect();
          const targetRect = target!.getBoundingClientRect();

          console.log("Badge Rect:", badgeRect);
          console.log("Target Rect:", targetRect);

          // Calculate overlap
          const overlapX = Math.max(0, Math.min(badgeRect.right, targetRect.right) - Math.max(badgeRect.left, targetRect.left));
          const overlapY = Math.max(0, Math.min(badgeRect.bottom, targetRect.bottom) - Math.max(badgeRect.top, targetRect.top));
          const overlapArea = overlapX * overlapY;

          // Calculate overlap percentage relative to badge size
          const badgeArea = badgeRect.width * badgeRect.height;
          const overlapPercentage = Math.min(overlapArea / badgeArea, 1);

          if (overlapPercentage > 0) {

            gsap.to(target, {
              duration: 0.9,
              color: badgeColor,
              ease: "elastic",

            });

          } else {

            gsap.to(target, {
              duration: 1.0,
              color: "#f97316", // Change back to original color
              ease: "sine.inOut"
            });
          }
        },

      });

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
