import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(Draggable);

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SinglePostItemComponent } from '../../components/single-post-item/single-post-item.component';

import { AllContentService } from '../../services/all-content/all-content.service';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SinglePostItemComponent
  ]

})
export class AdventuresComponent implements OnInit {

  adventurePosts: any;
  //@ViewChildren(SinglePostItemComponent) singlePostItemComponents!: QueryList<SinglePostItemComponent>;

  constructor(
    private allContentService: AllContentService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {

    this.getAdventurePosts();


  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      this.animatePostItems();
    }, 1000);

    this.animateHeroText();
    //this.animateSubtitleText();
    this.animateIcons();
    this.animateDraggableItems();

  }

  getAdventurePosts() {

    this.allContentService.getAdventurePosts().subscribe(posts => {
      this.adventurePosts = posts;
      console.log(this.adventurePosts);
    });

  }

  animateDraggableItems() {

    const items = gsap.utils.toArray('.draggable-item') as HTMLElement[];

    Draggable.create(items, {
      type: 'x,y',
      inertia: true
    });

  }

  animateSubtitleText() {

    SplitText.create(".hero-section p", {
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

  animateHeroText() {

    gsap.from(".hero-section h1, .hero-section p", {
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

  animatePostItems() {

    document.querySelectorAll('.single-post-item').forEach((box) => {

      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          toggleActions: 'restart none none restart',
        },
      });

      scrollBox.from(box, {
        y: 150,
        opacity: 0,
        stagger: 0.2,
        duration: 4.5,
      });

    });

  }


}
