import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { Preloader } from '../../utils/preloader';
import { ComingSoonComponent } from '../../components/coming-soon/coming-soon.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

gsap.registerPlugin(SplitText, Draggable, ScrollTrigger);
// gsap.registerPlugin(Draggable);
// gsap.registerPlugin(ScrollTrigger);

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleHikeItemComponent } from '../../components/single-hike-item/single-hike-item.component';

import { AllContentService } from '../../services/all-content/all-content.service';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-upcoming-hikes',
  templateUrl: './upcoming-hikes.component.html',
  styleUrls: ['./upcoming-hikes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PreloaderComponent,
    ComingSoonComponent,
    HeaderComponent,
    SingleHikeItemComponent,
    FooterComponent,
    NgxSkeletonLoaderModule
  ]

})
export class UpcomingHikesComponent implements OnInit {

  hikePosts: any;
  loading: boolean = false;
  siteImages: any = [];
  loadingContent: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private allContentService: AllContentService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.document.documentElement.scrollTop = 0;
    this.getUpcomingHikes();

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
      this.loading = true;
      this.animateHikeItems();
    }, 2500);

    this.autoRotateIcons();
    this.animateDraggableItems();
    this.animateHeroText();
    this.animateIcons();

  }

  getUpcomingHikes() {

    this.allContentService.getAllUpcomingHikes().subscribe((response: any[]) => {

      this.loadingContent = true;

      if (response && response.length > 0 && response !== null) {
        this.hikePosts = response;

        this.loadingContent = false;

      }

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

  }

  animateDraggableItems() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    Draggable.create(items, {
      type: 'rotation',
      bounds: '.hikes-title',
      inertia: true
    });

  }

  animateHeroText() {

    gsap.from(".hero-section h1", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      stagger: 0.05,
      ease: "power3",
      toggleActions: 'restart none none none'
    });

  }

  animateIcons() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    gsap.from(items, {
      opacity: 0,
      y: 700,
      duration: 5,
      delay: 1,
      rotation: 180,
      ease: "elastic"
    });

  }

  animateHikeItems() {

    // document.querySelectorAll('.single-hike-item').forEach((box) => {

    //   const scrollBox = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: box,
    //       toggleActions: 'restart none none restart',
    //     },
    //   });

    //   scrollBox.from(box, {
    //     y: 150,
    //     opacity: 0,
    //     duration: 2.0,
    //     stagger: 1,
    //   });

    // });

    gsap.from(".single-hike .single-hike-item", {
      scrollTrigger: {
        trigger: ".hike-posts-section",
      },
      toggleActions: 'play pause resume reset',
      opacity: 0,
      y: 100,
      duration: 2.5,
      stagger: 1.5,
      ease: "power2.out",

    });

  }

}
