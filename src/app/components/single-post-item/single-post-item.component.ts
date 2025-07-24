import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-single-post-item',
  templateUrl: './single-post-item.component.html',
  styleUrls: ['./single-post-item.component.scss'],
  standalone: true,

})
export class SinglePostItemComponent {

  @Input() postTitle: string = '';
  @Input() postSubtitle: string = '';
  @Input() postImageUrl: string = '';
  @Input() postImageAlt: string = '';

  constructor(public el: ElementRef) { }

  // Additional methods can be added here if needed
}
