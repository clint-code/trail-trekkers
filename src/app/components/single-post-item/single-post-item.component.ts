import { Component, Input, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-post-item',
  templateUrl: './single-post-item.component.html',
  styleUrls: ['./single-post-item.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DatePipe
  ]

})
export class SinglePostItemComponent {

  threshold: number = 1;

  @Input() postTitle: string = '';
  @Input() postSubtitle: string = '';
  @Input() postDate!: Date;
  @Input() postImageUrl: string = '';
  @Input() postImageAlt: string = '';

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
