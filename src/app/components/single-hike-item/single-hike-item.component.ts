import { Component, Input, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-hike-item',
  templateUrl: './single-hike-item.component.html',
  styleUrls: ['./single-hike-item.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DatePipe
  ]

})

export class SingleHikeItemComponent {

  threshold: number = 1;

  @Input() hikeMonth: string = '';
  @Input() hikeDate: string = '';
  @Input() hikeTitle: string = '';
  @Input() hikeLocation: string = '';
  @Input() hikeDifficulty: string = '';
  @Input() hikeImageUrl: string = '';
  @Input() hikeImageAlt: string = '';

  constructor(public el: ElementRef) { }

  // Additional methods can be added here if needed

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
