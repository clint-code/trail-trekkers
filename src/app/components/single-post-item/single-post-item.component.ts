import { Component, Input } from '@angular/core';

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

  constructor() { }

  // Additional methods can be added here if needed
}
