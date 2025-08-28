import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-hero-image',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './post-hero-image.component.html',
  styleUrl: './post-hero-image.component.css'
})
export class PostHeroImageComponent {

  @Input() hikeTitle: string = '';
  @Input() locationImage: string = '';

}
