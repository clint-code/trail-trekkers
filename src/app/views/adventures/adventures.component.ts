import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SinglePostItemComponent } from 'src/app/components/single-post-item/single-post-item.component';
import { AdventurePostsService } from 'src/app/services/adventure-posts/adventure-posts.service';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SinglePostItemComponent
  ]

})
export class AdventuresComponent implements OnInit {

  adventurePosts: any;

  constructor(private adventurePostsService: AdventurePostsService) { }

  ngOnInit(): void {
    this.adventurePostsService.getAdventurePosts().subscribe(posts => {
      this.adventurePosts = posts;
      console.log(this.adventurePosts);
      //gsap.from('.adventure-post', { duration: 1, opacity: 0, y: 50, stagger: 0.2 });
    });
  }

}
