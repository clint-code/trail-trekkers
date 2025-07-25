import { Component, Input, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-hike-item',
  templateUrl: './single-hike-item.component.html',
  styleUrls: ['./single-hike-item.component.scss'],
  standalone: true,
  imports: [DatePipe]

})

export class SingleHikeItemComponent {

  @Input() hikeMonth: string = '';
  @Input() hikeDate: string = '';
  @Input() hikeTitle: string = '';
  @Input() hikeLocation: string = '';
  @Input() hikeDifficulty: string = '';
  @Input() hikeImageUrl: string = '';
  @Input() hikeImageAlt: string = '';

  constructor(public el: ElementRef) { }

  // Additional methods can be added here if needed
}
