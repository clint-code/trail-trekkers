import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapLabel } from '../../utils/map-label.interface';
import { WordPressHike } from '../../utils/wordpress-hike.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HikingMapService {

  constructor(
    private http: HttpClient
  ) { }

  getLocationPosts(): Observable<MapLabel[]> {
    return this.http.get<WordPressHike[]>(`${environment.contentRoot}upcoming_hikes`)
      .pipe(
        map(hikes => hikes.map(hike => this.transformToMapLabel(hike)))
      );
  }


  private transformToMapLabel(hike: WordPressHike): MapLabel {
    const metadata = hike.acf?.metadata_collection || {};
    const featuredImage = hike.acf?.featured_image || {};
    const formattedDate = this.formatDate(hike.acf.date);

    return {
      id: hike.slug,
      lines: [
        hike.title.rendered.toUpperCase(),
        `(${formattedDate})`
      ],
      status: metadata.hike_status,
      x: parseFloat(metadata['x_axis_label_position']) || 0,
      y: parseFloat(metadata['y_axis_label_position']) || 0,
      fontSize: parseFloat(metadata.map_label_font_size) || 30,
      rotate: metadata.map_rotate_value ? parseFloat(metadata.map_rotate_value) : undefined,
      rotatePivotX: metadata.rotate_pivot_x_axis ? parseFloat(metadata.rotate_pivot_x_axis) : undefined,
      rotatePivotY: metadata.rotate_pivot_y_axis ? parseFloat(metadata.rotate_pivot_y_axis) : undefined,
      link: hike.slug,
      iconPath: featuredImage.url || '',
      iconAlt: featuredImage.alt || featuredImage.title || hike.slug
    };
  }

  private formatDate(dateString: string): string {
    // Convert "2026-04-11" to "11th April"
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });

    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} ${month}`;
  }

  private getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  private getHikeStatus(hikeStatus: boolean): string {
    // You can customize this based on your logic
    // For example, check if the date has passed
    return hikeStatus ? 'CONQUERED!' : 'COMING SOON!';
  }

}
