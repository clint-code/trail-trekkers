import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';
import { SingleHikeInfoItemComponent } from '../../components/single-hike-info-item/single-hike-info-item.component';
import { SinglePostItemComponent } from '../../components/single-post-item/single-post-item.component';

import { AllContentService } from '../../services/all-content/all-content.service';

import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowRight, faMountain, faLocationDot, faPersonHiking, faClock, faCompass } from "@fortawesome/free-solid-svg-icons";

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

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
    SingleHikeInfoItemComponent,
    SinglePostItemComponent
  ]
})
export class SingleAdventurePostComponent {

  threshold: number = 1;

  hikeInfoDetails: any[] = [];
  adventurePosts: any;


  constructor(
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
      faPersonHiking
    );

    // Register GSAP plugins
    gsap.registerPlugin(DrawSVGPlugin);

  }

  ngOnInit(): void {

    this.getAdventurePostContent();
    this.getOtherAdventurePosts();

  }

  getOtherAdventurePosts() {

    this.allContentService.getAdventurePosts().subscribe(posts => {
      this.adventurePosts = posts;
    });

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
