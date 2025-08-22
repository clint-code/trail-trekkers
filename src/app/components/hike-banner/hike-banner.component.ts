import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-hike-banner',
  templateUrl: './hike-banner.component.html',
  styleUrls: ['./hike-banner.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent
  ]

})
export class HikeBannerComponent {

  @Input() hikeTitle: string = '';
  @Input() hikeLocation: string = '';
  @Input() locationImage: string = '';
  @Input() locationImageAlt: string = '';

  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faLocationDot
    );
  }

  ngAfterViewInit() {

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out" }
    );

    gsap.from(".banner-text h2, .banner-text p", {
      opacity: 0,
      y: 200,
      duration: 2.5,
      delay: 1,
      stagger: 0.05,
      ease: "",
      toggleActions: 'restart none none none'
    });

  }

}

