import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleAboutItemComponent } from '../../components/single-about-item/single-about-item.component';

import { AboutItemsService } from '../../services/about-items/about-items.service';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

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

    gsap.fromTo(".draw-path",
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, stagger: 0.3 }
    );

    // gsap.to("#myPath", { stroke: "red", duration: 1 });


  }

  getAboutItems() {

    this.aboutItemService.getAboutItems().subscribe(items => {

      this.aboutItems = items;

    });
  }

}
