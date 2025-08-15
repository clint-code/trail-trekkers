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


}
