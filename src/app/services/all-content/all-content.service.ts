import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getHikePosts(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/hike-posts.json");
  }

}
