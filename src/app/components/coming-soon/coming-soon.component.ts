import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-coming-soon',
  imports: [LottieComponent],
  standalone: true,
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {

  options: AnimationOptions = {
    path: '/assets/animations/lottie-coming-soon.json',
    loop: true,
    autoplay: true
  };

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {

  }

  animationCreated(animationItem: AnimationItem): void {
  }

  loadAnimation() {

  }

}
