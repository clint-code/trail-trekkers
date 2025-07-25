import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(SplitText);

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleHikeItemComponent } from '../../components/single-hike-item/single-hike-item.component';
import { HikePostsService } from '../../services/hikes/hike-posts.service';


@Component({
  selector: 'app-upcoming-hikes',
  templateUrl: './upcoming-hikes.component.html',
  styleUrls: ['./upcoming-hikes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SingleHikeItemComponent,
    FooterComponent
  ]

})
export class UpcomingHikesComponent implements OnInit {

  hikePosts: any;

  constructor(
    private hikePostsService: HikePostsService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {

    this.getUpcomingHikes();

  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);
    this.animateHeroText();
    this.animateIcons();

  }

  getUpcomingHikes() {

    this.hikePostsService.getHikePosts().subscribe(posts => {
      // Process the hike posts data here
      this.hikePosts = posts;
      console.log(posts);
    });

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
