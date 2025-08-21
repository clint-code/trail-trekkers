import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HikeBannerComponent } from '../../components/hike-banner/hike-banner.component';

import { AllContentService } from '../../services/all-content/all-content.service';

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

@Component({
  selector: 'app-single-adventure-post',
  templateUrl: './single-adventure-post.component.html',
  styleUrls: ['./single-adventure-post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HikeBannerComponent
  ]
})
export class SingleAdventurePostComponent {

  faIconLibrary: FaIconLibrary;
  threshold: number = 1;

  constructor(
    private allContentService: AllContentService,
    faIconLibrary: FaIconLibrary) {
    this.faIconLibrary = faIconLibrary;
    this.allContentService = allContentService;
    this.faIconLibrary.addIcons(
      faArrowRight
    );

    // Register GSAP plugins
    gsap.registerPlugin(DrawSVGPlugin);

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
