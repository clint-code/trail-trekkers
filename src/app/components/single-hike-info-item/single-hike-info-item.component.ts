import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-hike-info-item',
  imports: [
    CommonModule,
  ],
  templateUrl: './single-hike-info-item.component.html',
  styleUrl: './single-hike-info-item.component.css',
  standalone: true
})
export class SingleHikeInfoItemComponent {

  @Input() hikeInfoIcon: string = '';
  @Input() hikeInfoIconAlt: string = '';
  @Input() hikeInfoTitle: string = '';
  @Input() hikeInfoDescription: string = '';

}
