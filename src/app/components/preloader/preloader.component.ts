import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
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

  onLoopCompleteCalledTimes = 0;

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
  ) { }

  onLoopComplete(): void {
    this.ngZone.run(() => {
      this.onLoopCompleteCalledTimes++;
      this.ref.detectChanges();
    });
  }

  ngOnInit(): void {
  }

}
