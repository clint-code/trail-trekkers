import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-single-hike-info-item',
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './single-hike-info-item.component.html',
  styleUrl: './single-hike-info-item.component.css',
  standalone: true
})
export class SingleHikeInfoItemComponent {

  @Input() hikeInfoIcon!: IconProp;
  @Input() hikeInfoIconAlt: string = '';
  @Input() hikeInfoTitle: string = '';
  @Input() hikeInfoDescription: string = '';
  @Input() hikeInfoList: string[] | undefined = [];

  constructor(private library: FaIconLibrary) { }

}
