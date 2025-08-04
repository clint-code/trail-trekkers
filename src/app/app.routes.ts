import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdventuresComponent } from './views/adventures/adventures.component';
import { UpcomingHikesComponent } from './views/upcoming-hikes/upcoming-hikes.component';
import { AboutComponent } from './views/about/about.component';
import { SingleUpcomingHikePostComponent } from './views/single-upcoming-hike-post/single-upcoming-hike-post.component';
import { SingleAdventurePostComponent } from './views/single-adventure-post/single-adventure-post.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'adventures',
        component: AdventuresComponent
    },

    {
        path: 'single-adventure-post',
        component: SingleAdventurePostComponent
    },

    {
        path: 'upcoming-hikes',
        component: UpcomingHikesComponent
    },

    {
        path: 'single-hike',
        component: SingleUpcomingHikePostComponent
    },

    {
        path: 'about',
        component: AboutComponent
    }

];