import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HikePostsService {

  constructor(private http: HttpClient) { }

  getHikePosts(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/hike-posts.json");
  }

}
