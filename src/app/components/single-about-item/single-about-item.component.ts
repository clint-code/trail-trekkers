import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-about-item',
  templateUrl: './single-about-item.component.html',
  styleUrl: './single-about-item.component.css',
  standalone: true,
})
export class SingleAboutItemComponent {

  @Input() itemIcon: string = '';
  @Input() itemIconAlt: string = '';
  @Input() itemDescription: string = '';

}
