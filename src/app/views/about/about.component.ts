import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleAboutItemComponent } from '../../components/single-about-item/single-about-item.component';

import { AboutItemsService } from '../../services/about-items/about-items.service';

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

  constructor(
    private aboutItemService: AboutItemsService
  ) { }

  ngOnInit(): void {
    this.getAboutItems();
  }

  ngAfterViewInit() {

    gsap.fromTo("#underlinePath",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.out" }
    );

  }

  getAboutItems() {

    this.aboutItemService.getAboutItems().subscribe(items => {

      this.aboutItems = items;

    });
  }


}
