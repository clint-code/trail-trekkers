import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

@Component({
  selector: 'app-single-upcoming-hike-post',
  templateUrl: './single-upcoming-hike-post.component.html',
  styleUrls: ['./single-upcoming-hike-post.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HikeBannerComponent
  ]
})
export class SingleUpcomingHikePostComponent {

  ngAfterViewInit() {

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out" }
    );

  }

}
