import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SinglePostItemComponent } from 'src/app/components/single-post-item/single-post-item.component';
import { AdventurePostsService } from 'src/app/services/adventure-posts/adventure-posts.service';

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
  @ViewChildren(SinglePostItemComponent) singlePostItemComponents!: QueryList<SinglePostItemComponent>;
  threshold: number = 1;

  constructor(
    private adventurePostsService: AdventurePostsService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {

    this.adventurePostsService.getAdventurePosts().subscribe(posts => {
      this.adventurePosts = posts;
      console.log(this.adventurePosts);
    });


  }

  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
      this.animatePostItems();
    }, 1000);

    this.animateHeroText();

    // const itemElements = this.singlePostItemComponents.map(comp => comp.el.nativeElement);

    // console.log(itemElements);

    // gsap.from(itemElements, {
    //   opacity: 0,
    //   y: 30,
    //   duration: 0.6,
    //   stagger: 0.2,
    //   ease: 'power2.out'
    // });

    this.animatePostItems();

  }

  animateHeroText() {

    gsap.from(".hero-section", {
      opacity: 0,
      y: 200,
      duration: 3.5,
      delay: 1,
      ease: "power3",
      toggleActions: 'restart none none none'
    });

  }

  animatePostItems() {

    document.querySelectorAll('.single-post-item').forEach((box) => {

      const scrollBox = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          // toggleActions: 'restart none none restart',
        },
      });

      scrollBox.from(box, {
        y: 150,
        opacity: 0,
        duration: 4.5,
        stagger: 1,
      });

    });

  }

  handleHover(event: any) {

    let card = event.target;

    const { clientX, clientY, currentTarget } = event;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;

    const rotateX = (this.threshold / 2 - horizontal * this.threshold).toFixed(2);
    const rotateY = (vertical * this.threshold - this.threshold / 2).toFixed(2);

    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;

  }

  resetStyles(event: any) {

    let card = event.target;

    card.style.transform = `perspective(${event.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;

  }


}
