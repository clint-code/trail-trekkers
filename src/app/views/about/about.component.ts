import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { gsap } from 'gsap';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AboutComponent {

}
