import { Component, Input } from '@angular/core';
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-single-about-item',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './single-about-item.component.html',
  styleUrl: './single-about-item.component.css',
  standalone: true,
})
export class SingleAboutItemComponent {

  @Input() itemIcon!: IconProp;
  @Input() itemDescription: string = '';

}
