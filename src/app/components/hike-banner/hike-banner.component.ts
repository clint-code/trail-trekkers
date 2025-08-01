import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-hike-banner',
  templateUrl: './hike-banner.component.html',
  styleUrls: ['./hike-banner.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]

})
export class HikeBannerComponent {

  @Input() hikeTitle: string = '';
  @Input() hikeLocation: string = '';
  @Input() locationImage: string = '';
  @Input() locationImageAlt: string = '';

  ngAfterViewInit() {

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out" }
    );

    gsap.from(".banner-text h2", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      stagger: 0.05,
      ease: "",
      toggleActions: 'restart none none none'
    });

    SplitText.create(".banner-text p", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          opacity: 0,
          x: 100,
          duration: 0.5,
          autoAlpha: 0,
          delay: 0.5,
          ease: "power3",
          stagger: 0.05
        });
      }
    });


  }

}

