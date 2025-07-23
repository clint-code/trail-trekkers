import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdventurePostsService {

  constructor(private http: HttpClient) { }

  getAdventurePosts(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/adventure-posts.json");
  }

}
