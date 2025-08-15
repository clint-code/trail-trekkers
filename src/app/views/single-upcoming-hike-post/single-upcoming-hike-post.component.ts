import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';
import { SingleHikeInfoItemComponent } from '../../components/single-hike-info-item/single-hike-info-item.component';

import { AllContentService } from '../../services/all-content/all-content.service';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
gsap.registerPlugin(DrawSVGPlugin);

@Component({
  selector: 'app-single-upcoming-hike-post',
  templateUrl: './single-upcoming-hike-post.component.html',
  styleUrls: ['./single-upcoming-hike-post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HikeBannerComponent,
    SingleHikeInfoItemComponent
  ]
})
export class SingleUpcomingHikePostComponent implements OnInit {

  hikeInfoDetails: any;

  constructor(
    private allContentService: AllContentService
  ) { }


  ngOnInit(): void {
    this.getHikeInfoDetails();
  }

  ngAfterViewInit() {
    this.animateSVGLine();

    setTimeout(() => {
      this.animateHikeInfoItems();
    }, 1000);

  }

  animateSVGLine() {

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        scrollTrigger: {
          trigger: '.title-section',
          // start: 'top 80%',
          // end: 'bottom 60%',
          scrub: true
        }
      }
    );

  }

  getHikeInfoDetails() {

    this.allContentService.getHikeInfoItems().subscribe(items => {

      this.hikeInfoDetails = items;
      console.log(this.hikeInfoDetails);
    });

  }

  animateHikeInfoItems() {

    gsap.from(".single-list-item .single-hike-info-item", {
      scrollTrigger: {
        trigger: ".list-items-section",
      },
      toggleActions: 'play pause resume reset',
      opacity: 0,
      y: 100,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",

    });

  }

}
