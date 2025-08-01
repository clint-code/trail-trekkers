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

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out" }
    );

  }

  getHikeInfoDetails() {

    this.allContentService.getHikeInfoItems().subscribe(items => {

      this.hikeInfoDetails = items;
      console.log(this.hikeInfoDetails);
    });

  }

}
