import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { gsap } from 'gsap';
import { SingleAdventurePostComponent } from '../single-adventure-post/single-adventure-post.component';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    SingleAdventurePostComponent
  ]

})
export class AdventuresComponent {

  adventurePosts: any[] = [];

}
