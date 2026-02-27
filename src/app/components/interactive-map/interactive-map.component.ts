import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

interface Trail {
  id: string;
  title: string;
  date: string;
  description: string;
  difficulty: string;
  distance: string;
  elevation: string;

  // Pixel coordinates on your image [x, y] — tweak to match illustration positions
  coords: [number, number];
  stopNumber: number;
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})

export class InteractiveMapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map!: L.Map;
  private markers: L.Marker[] = [];
  private pathLayer!: L.Polyline;
  private svgOverlay!: L.SVGOverlay;

  selectedTrail: Trail | null = null;
  panelVisible = false;
  pathDrawn = false;

  // Image dimensions — update if yours differ
  private readonly IMG_WIDTH = 2000;
  private readonly IMG_HEIGHT = 1720;

  trails: Trail[] = [
    {
      id: 'sagana',
      title: "Sagana's Scenic Splendor (Canyons)",
      date: '14th March',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [204, 294],
      stopNumber: 1
    },
    {
      id: 'longonot',
      title: "Longonot's Rim of Radiant Vistas",
      date: '11th April',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [600, 336],
      stopNumber: 2
    },
    {
      id: 'kiima',
      title: 'Kiima Kimwe: Crown of the County',
      date: '9th May',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [960, 273],
      stopNumber: 3
    },
    {
      id: 'gatamaiyu',
      title: "Gatamaiyu's Green Grandeur",
      date: '13th June',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [204, 630],
      stopNumber: 4
    },
    {
      id: 'elephant',
      title: 'Elephant Hill: Granite, Grit & Glory',
      date: '11th July',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [600, 630],
      stopNumber: 5
    },
    {
      id: 'kahunira',
      title: "Kahunira's Woodland Waterways",
      date: '8th August',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [960, 609],
      stopNumber: 6
    },
    {
      id: 'mtkenya',
      title: 'Mt. Kenya: Crown of the Clouds',
      date: 'September 23–26th',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'ADD DIFFICULTY',
      distance: 'ADD DISTANCE',
      elevation: 'ADD ELEVATION',
      coords: [864, 893],
      stopNumber: 7
    }
  ];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initMap();
      this.addImageOverlay();
      this.addTrailPath();
      this.addMarkers();
    });
  }

  private initMap(): void {
    // Use simple CRS so pixel coords map directly
    this.map = L.map(this.mapContainer.nativeElement, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      attributionControl: false,
      zoomControl: false,
    });

    // Fit map to image bounds
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [this.IMG_HEIGHT, this.IMG_WIDTH]
    ];
    this.map.fitBounds(bounds);
    this.map.setMaxBounds(bounds);

    // Custom zoom control (top right)
    L.control.zoom({ position: 'topright' }).addTo(this.map);
  }

  private addImageOverlay(): void {
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [this.IMG_HEIGHT, this.IMG_WIDTH]
    ];
    L.imageOverlay('/assets/img/trail-to-the-throne-web-map.jpg', bounds).addTo(this.map);
  }

  private addTrailPath(): void {
    // Convert pixel [x,y] to Leaflet LatLng [y, x] (row, col)
    const latlngs: L.LatLngExpression[] = this.trails.map(t =>
      [t.coords[1], t.coords[0]] as L.LatLngExpression
    );

    this.pathLayer = L.polyline(latlngs, {
      color: '#d25a14',
      weight: 3,
      opacity: 0,
      dashArray: '10, 8',
      dashOffset: '0',
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(this.map);

    // Animate path opacity in after short delay
    setTimeout(() => {
      this.animatePath();
    }, 600);
  }

  private animatePath(): void {
    const el = (this.pathLayer as any)._path as SVGPathElement;
    if (!el) return;

    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    el.style.opacity = '1';
    el.style.transition = 'stroke-dashoffset 3s ease-in-out, opacity 0.5s';

    requestAnimationFrame(() => {
      el.style.strokeDashoffset = '0';
    });

    this.pathDrawn = true;
  }

  private addMarkers(): void {
    this.trails.forEach((trail, index) => {
      const icon = this.createPulsingIcon(trail.stopNumber, index);

      const marker = L.marker(
        [trail.coords[1], trail.coords[0]],
        { icon }
      ).addTo(this.map);

      marker.on('click', () => {
        this.ngZone.run(() => this.onMarkerClick(trail));
      });

      this.markers.push(marker);
    });
  }

  private createPulsingIcon(stopNumber: number, index: number): L.DivIcon {
    return L.divIcon({
      className: '',
      html: `
        <div class="trail-pin" style="animation-delay: ${index * 0.15}s">
          <div class="pin-pulse" style="animation-delay: ${index * 0.15}s"></div>
          <div class="pin-core">
            <span class="pin-number">${stopNumber}</span>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });
  }

  onMarkerClick(trail: Trail): void {
    if (this.selectedTrail?.id === trail.id) {
      this.closePanel();
      return;
    }
    this.selectedTrail = trail;
    this.panelVisible = true;

    // Pan map slightly toward marker
    this.map.panTo([trail.coords[1], trail.coords[0]], { animate: true, duration: 0.6 });
  }

  closePanel(): void {
    this.panelVisible = false;
    setTimeout(() => this.selectedTrail = null, 400);
  }

  ngOnDestroy(): void {
    this.map.remove();
  }

}
