import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-upcoming-hikes',
  templateUrl: './upcoming-hikes.component.html',
  styleUrls: ['./upcoming-hikes.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]

})
export class UpcomingHikesComponent {

}
