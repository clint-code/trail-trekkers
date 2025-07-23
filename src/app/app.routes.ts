import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdventuresComponent } from './views/adventures/adventures.component';
import { UpcomingHikesComponent } from './views/upcoming-hikes/upcoming-hikes.component';
import { AboutComponent } from './views/about/about.component';


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
        path: 'upcoming-hikes',
        component: UpcomingHikesComponent
    },

    {
        path: 'about',
        component: AboutComponent
    }

];