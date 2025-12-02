import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';
import { SingleHikeInfoItemComponent } from '../../components/single-hike-info-item/single-hike-info-item.component';
import { SinglePostItemComponent } from '../../components/single-post-item/single-post-item.component';
import { PostHeroImageComponent } from 'src/app/components/post-hero-image/post-hero-image.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { Preloader } from '../../utils/preloader';

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
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    HikeBannerComponent,
    PostHeroImageComponent,
    SingleHikeInfoItemComponent,
    SinglePostItemComponent,
    FaIconComponent,
    DatePipe
  ]
})
export class SingleAdventurePostComponent {

  @ViewChild('theJourney') theJourney !: ElementRef;
  @ViewChild('rewardingViews') rewardingViews !: ElementRef;
  @ViewChild('inSummary') inSummary !: ElementRef;

  imagesLoaded: boolean = false;
  siteImages: any = [];
  postSlug: string = "";

  adventurePostContent: any = [];
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
    private route: ActivatedRoute,
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

    this.postSlug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.getAdventurePostContent();
    this.getOtherAdventurePosts();

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
    }, 1000);

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

    this.allContentService.getSingleAdventure(this.postSlug).subscribe((response: any[]) => {

      // if (response && response.length > 0 && response !== null) {
      //   const adventurePost = response[0];
      // }

      this.adventurePostContent = response[0];

      // this.hikeInfoDetails = Object.values(this.hikeInfoDetails.acf.hike_info_collection).map((item: any) => ({
      //   infoIcon: item.info_icon,
      //   infoTitle: item.info_title,
      //   infoDescription: item.info_description,
      //   infoList: item.info_list,
      //   iconObject: this.library.getIconDefinition('fas', item.info_icon)
      // }));

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

  }


}
