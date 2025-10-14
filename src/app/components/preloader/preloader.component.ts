import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [LottieComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})

export class PreloaderComponent {

  options: AnimationOptions = {
    path: '/assets/animations/outdoor-boots-animation-video.json',
    loop: true,
    autoplay: true
  };

  styles: Partial<CSSStyleDeclaration> = {
    width: '600px',
    margin: '0 auto'
  };

  @Input() images: any = [];
  @Output() siteLoaded = new EventEmitter<boolean>();
  siteImages: any = [];
  imagesLoaded: number = 0;
  totalImages: number = 0;
  percentageLoaded: number = 0;

  // onLoopCompleteCalledTimes = 0;

  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }

  constructor(
    // private ngZone: NgZone,
    // private ref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  // onLoopComplete(): void {
  //   this.ngZone.run(() => {
  //     this.onLoopCompleteCalledTimes++;
  //     this.ref.detectChanges();
  //   });
  // }

  ngOnInit(): void {
    this.imagesLoaded = 0;
    this.siteImages = this.images;
    this.totalImages = this.siteImages.length;

    if (this.totalImages > 0) {

      this.loadImages(this.siteImages);

    }

  }


  loadImages(images: any) {

    for (let i = 0; i < this.totalImages; i++) {

      const image = new Image();

      console.log("Image:", image);

      image.addEventListener("load", (event) => {

        this.imageLoaded(event);

      }, false);

      image.src = this.siteImages[i];

      console.log("Image.src:", image.src);
    }

  }

  imageLoaded(event: Event) {

    this.imagesLoaded++;

    console.log("Images loaded:", this.imagesLoaded++);

    this.percentageLoaded = Math.round((this.imagesLoaded / this.totalImages) * 100);

    if (this.imagesLoaded == this.totalImages) {

      // setTimeout(()=>{      }, 2000);
      this.loadComplete();

    }

  }

  loadComplete() {

    this.siteLoaded.emit(true);
    const preloader = this.document.querySelector('.preloader') as HTMLElement;

    if (preloader) {
      preloader.classList.add('fade-out-up');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
    }
    //$(".preloader").fadeOut();

  }

}
