import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AllContentService {

  constructor(private http: HttpClient) { }

  getAdventurePosts(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/adventure-posts.json");
  }

  getAboutItems(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/about-items.json");
  }

  getHikeInfoItems(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/hike-info-details.json");
  }

  getAdventureSummaryDetails(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/adventure-posts-hiking-summary.json");
  }

  getHikePosts(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/hike-posts.json");
  }

  getAllUpcomingHikes(): Observable<any[]> {

    return this.http.get<any[]>(`${environment.contentRoot}upcoming_hikes`);

  }

  getSingleUpcomingHike(hikeSlug: any): Observable<any[]> {

    return this.http.get<any[]>(`${environment.contentRoot}upcoming_hikes?slug=${hikeSlug}`);

  }



}
