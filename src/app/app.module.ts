import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AdventuresComponent } from './views/adventures/adventures.component';
import { SingleAdventurePostComponent } from './views/single-adventure-post/single-adventure-post.component';
import { UpcomingHikesComponent } from './views/upcoming-hikes/upcoming-hikes.component';
import { SingleUpcomingHikePostComponent } from './views/single-upcoming-hike-post/single-upcoming-hike-post.component';
import { AboutComponent } from './views/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SinglePostItemComponent } from './components/single-post-item/single-post-item.component';
import { PostBannerComponent } from './components/post-banner/post-banner.component';
import { HikeBannerComponent } from './components/hike-banner/hike-banner.component';
import { SingleHikeItemComponent } from './components/single-hike-item/single-hike-item.component';


@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    HomeComponent,
    AdventuresComponent,
    SingleAdventurePostComponent,
    UpcomingHikesComponent,
    SingleUpcomingHikePostComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SinglePostItemComponent,
    PostBannerComponent,
    HikeBannerComponent,
    SingleHikeItemComponent,
    BrowserModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
