import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-upcoming-hikes',
  templateUrl: './upcoming-hikes.component.html',
  styleUrls: ['./upcoming-hikes.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]

})
export class UpcomingHikesComponent implements OnInit {

  ngOnInit(): void {

    gsap.registerPlugin(ScrollTrigger);
    this.animateHeroText();
    this.animateIcons();

  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

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
      y: 200,
      duration: 5,
      delay: 1,
      rotation: 360,
      ease: "elastic"
    });

  }


}
