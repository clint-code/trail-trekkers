import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';
import { SingleHikeInfoItemComponent } from '../../components/single-hike-info-item/single-hike-info-item.component';
import { SinglePostItemComponent } from '../../components/single-post-item/single-post-item.component';
import { PostHeroImageComponent } from 'src/app/components/post-hero-image/post-hero-image.component';

import { AllContentService } from '../../services/all-content/all-content.service';

import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faArrowRight,
  faLocationArrow,
  faMountain,
  faLocationDot,
  faPersonHiking,
  faClock,
  faCompass
} from "@fortawesome/free-solid-svg-icons";

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-single-adventure-post',
  templateUrl: './single-adventure-post.component.html',
  styleUrls: ['./single-adventure-post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HikeBannerComponent,
    PostHeroImageComponent,
    SingleHikeInfoItemComponent,
    SinglePostItemComponent,
    FaIconComponent
  ]
})
export class SingleAdventurePostComponent {

  @ViewChild('theJourney') theJourney !: ElementRef;
  @ViewChild('rewardingViews') rewardingViews !: ElementRef;
  @ViewChild('inSummary') inSummary !: ElementRef;

  threshold: number = 1;

  hikeInfoDetails: any[] = [];
  adventurePosts: any[] = [
    {
      id: 2,
      title: "Call of the Wild",
      postDate: "2024-03-09",
      imageUrl: "assets/img/blog-article-imgs/lolida-eburru-campsite.png",
      imageAlt: "Lolida Eburru Campsite",
      location: "Lolida Eburru Campsite, Naivasha"
    },
    {
      id: 2,
      title: "Beyond Expectations",
      postDate: "2024-03-09",
      imageUrl: "assets/img/blog-article-imgs/Kijabe-Hill.png",
      imageAlt: "Kijabe Hill",
      location: "Kijabe Hill, Kijabe"
    },
    {
      id: 2,
      title: "Cold Nights, Warm Memories",
      postDate: "2024-03-09",
      imageUrl: "assets/img/blog-article-imgs/cold-loldia-eburru.png",
      imageAlt: "Lolida Eburru Campsite",
      location: "Lolida Eburru Campsite, Naivasha"
    }
  ];



  constructor(
    @Inject(DOCUMENT) private document: Document,
    private allContentService: AllContentService,
    private faIconLibrary: FaIconLibrary
  ) {
    this.allContentService = allContentService;
    this.faIconLibrary.addIcons(
      faArrowRight,
      faClock,
      faCompass,
      faLocationDot,
      faMountain,
      faPersonHiking,
      faLocationArrow
    );

  }

  ngOnInit(): void {
    this.document.documentElement.scrollTop = 0;
    this.getAdventurePostContent();
    this.getOtherAdventurePosts();

  }

  ngAfterViewInit() {

    gsap.to("#scrollbarBg", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });



  }

  getOtherAdventurePosts() {

    // this.allContentService.getAdventurePosts().subscribe(posts => {
    //   this.adventurePosts = posts;
    // });

  }

  getAdventurePostContent() {

    this.allContentService.getAdventureSummaryDetails().subscribe(items => {

      this.hikeInfoDetails = items;

      this.hikeInfoDetails = items.map(item => ({
        ...item,
        iconObject: this.faIconLibrary.getIconDefinition('fas', item.infoIcon)
      }));
    });


  }

  scrollToTarget(section: string) {
    const sectionMap: { [key: string]: ElementRef; } = {
      theJourney: this.theJourney,
      rewardingViews: this.rewardingViews,
      inSummary: this.inSummary
    };

    const target = sectionMap[section];

    if (target) {
      target.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`No ViewChild found for section: ${section}`);
    }

    //console.log("Target:", target);

  }


  handleHover(event: any) {
    let imageThumbnail = event.target;

    const { clientX, clientY, currentTarget } = event;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = (this.threshold / 2 - horizontal * this.threshold).toFixed(2);
    const rotateY = (vertical * this.threshold - this.threshold / 2).toFixed(2);

    imageThumbnail.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.03, 1.03, 1.03)`;

  }

  resetStyles(event: any) {
    let imageThumbnail = event.target;
    imageThumbnail.style.transform = `perspective(${event.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }


}
