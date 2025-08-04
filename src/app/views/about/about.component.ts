import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleAboutItemComponent } from '../../components/single-about-item/single-about-item.component';

import { AllContentService } from '../../services/all-content/all-content.service';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SingleAboutItemComponent
  ]
})

export class AboutComponent implements OnInit {

  aboutItems: any;
  threshold: number = 1;

  constructor(
    private allContentService: AllContentService
  ) { }

  ngOnInit(): void {
    this.getAboutItems();
  }

  ngAfterViewInit() {

    this.animateSVGLine();
    this.animateHeroText();

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

  animateHeroText() {

    gsap.from(".about-title-section .about-title h1, p", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      stagger: 0.05,
      ease: "power3",
      toggleActions: 'restart none none none'
    });

  }

  animateSubtitleText() {

    SplitText.create(".about-title-section .about-title p", {
      type: "words, chars",
      onSplit(self) {
        gsap.from(self.chars, {
          opacity: 0,
          x: 100,
          duration: 0.5,
          autoAlpha: 0,
          delay: 0.5,
          ease: "power4",
          stagger: 0.05
        });
      }
    });

  }

  getAboutItems() {

    this.allContentService.getAboutItems().subscribe(items => {

      this.aboutItems = items;

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
