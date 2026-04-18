import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { FaIconComponent, FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBusSimple, faEarthAfrica, faPeopleGroup, faSun } from '@fortawesome/free-solid-svg-icons';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SingleAboutItemComponent } from '../../components/single-about-item/single-about-item.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { Preloader } from '../../utils/preloader';

import { AllContentService } from '../../services/all-content/all-content.service';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    SingleAboutItemComponent
  ]
})

export class AboutComponent {

  aboutContentDetails: any = [];
  iconItems: any = [];
  threshold: number = 1;
  pageSlug: string = "";
  imagesLoaded: boolean = false;
  siteImages: any = [];
  loadingContent: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private allContentService: AllContentService,
    private library: FaIconLibrary

  ) {
    this.library.addIcons(
      faBusSimple,
      faEarthAfrica,
      faPeopleGroup,
      faSun
    );
  }

  ngOnInit(): void {
    this.document.documentElement.scrollTop = 0;
    this.getAboutItems();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
    }, 1500);

    this.animateSVGLine();
    this.animateHeroText();
    //this.animateQuoteText();
    //this.animateSubtitleText();
    this.autoRotateIcons();

    setTimeout(() => {
      this.animateAboutItems();
    }, 1000);

  }

  autoRotateIcons() {

    gsap.to(".rotating-compass", {
      duration: 10,
      rotation: 360,
      type: "rotation",
      repeat: -1,
      ease: "linear",
      transformOrigin: "50% 50%"
    });

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

    SplitText.create(".how-it-started-section .how-it-started-cnt p", {
      type: "words",
      onSplit(self) {
        gsap.from(self.words, {
          scrollTrigger: {
            trigger: ".how-it-started-section",
            //scrub: true
          },
          toggleActions: 'play pause resume reset',
          opacity: 0,
          x: 100,
          duration: 2.0,
          autoAlpha: 0,
          delay: 0.5,
          ease: "power4",
          stagger: 0.2
        });
      }
    });

  }

  getAboutItems() {

    this.allContentService.getContentBySlug("about-trail-trekkers").subscribe((response: any[]) => {

      this.loadingContent = true;

      if (response !== null && response.length > 0) {

        this.aboutContentDetails = response[0];
        this.loadingContent = false;

        this.iconItems = Object.values(this.aboutContentDetails.acf.why_we_do_this_section).map((item: any) => ({
          infoIcon: item.reason_icon,
          infoDescription: item.reason_text,
          iconObject: this.library.getIconDefinition('fas', item.reason_icon)
        }));

      }

    });

  }


  animateAboutItems() {

    gsap.from(".single-list-item .single-item", {
      scrollTrigger: {
        trigger: ".list-items-section",
        scrub: true
      },
      toggleActions: 'play pause resume reset',
      opacity: 0,
      y: 100,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",

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

  animateQuoteText() {

    SplitText.create(".quote-section", {
      type: "words",
      onSplit(self) {
        gsap.from(self.words, {
          scrollTrigger: {
            trigger: ".quote-section",
          },
          toggleActions: 'play pause resume reset',
          opacity: 0,
          x: 100,
          duration: 1.5,
          autoAlpha: 0,
          delay: 2.5,
          ease: "power2.out",
          stagger: 0.2
        });
      }
    });

  }


}
