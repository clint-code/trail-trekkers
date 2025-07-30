import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutItemsService {

  constructor(private http: HttpClient) { }

  getAboutItems(): Observable<any[]> {
    return this.http.get<any[]>("/assets/data/about-items.json");
  }

}
