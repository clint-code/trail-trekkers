import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hike-banner',
  templateUrl: './hike-banner.component.html',
  styleUrls: ['./hike-banner.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]

})
export class HikeBannerComponent {

  @Input() hikeTitle: string = '';
  @Input() hikeLocation: string = '';
  @Input() locationImage: string = '';
  @Input() locationImageAlt: string = '';

}
