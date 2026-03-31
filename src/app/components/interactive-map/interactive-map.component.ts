import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, SecurityContext, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { gsap } from 'gsap';
import { MotionPathPlugin, DrawSVGPlugin } from 'gsap/all';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

interface MapLabel {
  id: string;
  lines: string[];
  x: number;
  y: number;
  fontSize: number;
  rotate?: number;
  rotatePivotX?: number;
  rotatePivotY?: number;
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})

export class InteractiveMapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @ViewChild('svgEl') svgEl!: ElementRef<SVGSVGElement>;
  @ViewChild('zoomLayer') zoomLayer!: ElementRef<SVGGElement>;

  svgContent: SafeHtml = '';
  svgViewBox = '0 0 2418.725 892.484';

  //zoom state
  private scale = 1;
  private translateX = 0;
  private translateY = 0;

  private readonly MIN_ZOOM = 1;    // can't zoom out past original
  private readonly MAX_ZOOM = 5;
  private readonly ZOOM_STEP = 0.15;

  //pinch state
  private lastPinchDist = 0;

  //pan state
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOriginX = 0;
  private panOriginY = 0;

  labels: MapLabel[] = [
    {
      id: 'longonot',
      lines: ['MT. LONGONOT', '(11th April)'],
      x: 300,
      y: 400,
      fontSize: 30
    },
    {
      id: 'kiima',
      lines: ['KIIMA KIMWE', 'HILL', '(9th May)'],
      x: 880,
      y: 340,
      fontSize: 30
    },
    {
      id: 'gatamaiyu',
      lines: ['GATAMAIYU', 'FOREST', '(13th June)'],
      x: 750,
      y: 605,
      fontSize: 30,
      rotate: -55,
      rotatePivotX: 860,
      rotatePivotY: 580
    },
    {
      id: 'elephant',
      lines: ['ELEPHANT HILL', '(11th July)'],
      x: 1500,
      y: 350,
      fontSize: 30
    },
    {
      id: 'kahunira',
      lines: ['KAHUNIRA', 'WATERFALL', '(8th August)'],
      x: 1650,
      y: 605,
      fontSize: 30
    },
    {
      id: 'mtkenya',
      lines: ['MT KENYA', '(Sept 23 - 26th)'],
      x: 2200,
      y: 520,
      fontSize: 35
    }
  ];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    //    this.loadSvg();

  }

  ngAfterViewInit(): void {
    this.setupWheelZoom();
    this.loadSvg();
  }

  private loadSvg(): void {
    this.http.get('assets/svg/svg-map.svg', { responseType: 'text' })
      .subscribe(svgData => {
        const stripped = this.stripSvgWrapper(svgData);
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(stripped);

        // Wait for Angular to render injected SVG content
        // before running GSAP
        setTimeout(() => this.animatePath(), 1000);

      });
  }

  //Wheel zom scoped only to SVG

  private setupWheelZoom(): void {

    const svg = this.svgEl.nativeElement;

    svg.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();  // prevents page scroll
      e.stopPropagation(); // stops event bubbling to page

      const delta = e.deltaY < 0 ? 1 + this.ZOOM_STEP : 1 - this.ZOOM_STEP;
      const newScale = Math.min(
        Math.max(this.scale * delta, this.MIN_ZOOM),
        this.MAX_ZOOM
      );

      // Zoom toward mouse cursor position
      const svgRect = svg.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      const factor = newScale / this.scale;
      this.translateX = mouseX - factor * (mouseX - this.translateX);
      this.translateY = mouseY - factor * (mouseY - this.translateY);
      this.scale = newScale;

      this.clampTranslation();
      this.applyTransform();
    }, { passive: false }); // passive: false required for preventDefault
  }

  //pan mouse
  onMouseDown(e: MouseEvent): void {
    if (this.scale <= 1) return; // no pan when not zoomed in
    this.isPanning = true;
    this.panStartX = e.clientX;
    this.panStartY = e.clientY;
    this.panOriginX = this.translateX;
    this.panOriginY = this.translateY;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isPanning) return;
    this.translateX = this.panOriginX + (e.clientX - this.panStartX);
    this.translateY = this.panOriginY + (e.clientY - this.panStartY);
    this.clampTranslation();
    this.applyTransform();
  }

  onMouseUp(): void {
    this.isPanning = false;
  }

  //pan touch
  onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length === 1) {
      this.isPanning = true;
      this.panStartX = e.touches[0].clientX;
      this.panStartY = e.touches[0].clientY;
      this.panOriginX = this.translateX;
      this.panOriginY = this.translateY;
    }
    if (e.touches.length === 2) {
      this.isPanning = false;
      this.lastPinchDist = this.getPinchDist(e);
    }
  }

  onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length === 1 && this.isPanning) {
      this.translateX = this.panOriginX + (e.touches[0].clientX - this.panStartX);
      this.translateY = this.panOriginY + (e.touches[0].clientY - this.panStartY);
      this.clampTranslation();
      this.applyTransform();
    }

    if (e.touches.length === 2) {
      const dist = this.getPinchDist(e);
      const factor = dist / this.lastPinchDist;
      const newScale = Math.min(
        Math.max(this.scale * factor, this.MIN_ZOOM),
        this.MAX_ZOOM
      );

      // Zoom toward pinch midpoint
      const svg = this.svgEl.nativeElement;
      const rect = svg.getBoundingClientRect();
      const midX = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
      const midY = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
      const f = newScale / this.scale;

      this.translateX = midX - f * (midX - this.translateX);
      this.translateY = midY - f * (midY - this.translateY);
      this.scale = newScale;
      this.lastPinchDist = dist;

      this.clampTranslation();
      this.applyTransform();
    }
  }

  onTouchEnd(): void {
    this.isPanning = false;
  }

  //Zoom buttons
  zoomIn(): void {
    const svg = this.svgEl.nativeElement;
    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    this.zoomAt(centerX, centerY, 1 + this.ZOOM_STEP * 2);
  }

  zoomOut(): void {
    const svg = this.svgEl.nativeElement;
    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;
    this.zoomAt(centerX, centerY, 1 - this.ZOOM_STEP * 2);
  }

  resetZoom(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.applyTransform();
  }

  private zoomAt(originX: number, originY: number, factor: number): void {
    const newScale = Math.min(
      Math.max(this.scale * factor, this.MIN_ZOOM),
      this.MAX_ZOOM
    );
    const f = newScale / this.scale;
    this.translateX = originX - f * (originX - this.translateX);
    this.translateY = originY - f * (originY - this.translateY);
    this.scale = newScale;
    this.clampTranslation();
    this.applyTransform();
  }

  //helpers

  private applyTransform(): void {
    const g = this.zoomLayer.nativeElement;
    g.setAttribute(
      'transform',
      `translate(${this.translateX}, ${this.translateY}) scale(${this.scale})`
    );
  }

  // Prevent panning outside the SVG bounds
  private clampTranslation(): void {
    const svg = this.svgEl.nativeElement;
    const w = svg.clientWidth;
    const h = svg.clientHeight;
    const scaled = this.scale;

    this.translateX = Math.min(0, Math.max(this.translateX, w - w * scaled));
    this.translateY = Math.min(0, Math.max(this.translateY, h - h * scaled));
  }

  private getPinchDist(e: TouchEvent): number {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.hypot(dx, dy);
  }
  //end of helpers


  // Removes the outer <svg ...> and </svg> tags
  // so we can embed the paths inside our own SVG with viewBox control
  private stripSvgWrapper(svg: string): string {
    return svg
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '');
  }

  private animatePath(): void {
    const path = document.querySelector('#trailPath') as SVGPathElement;
    console.log("Path:", path);

    // Master timeline
    const tl = gsap.timeline({ delay: 1.0 });

    // ── 1. DrawSVG — reveal the path progressively ──────────
    tl.from(path, {
      drawSVG: '0%',      // start invisible
      duration: 2.5,        // 5 seconds to draw full path
      ease: 'power2.inOut'
    })

      // ── 3. Fade in labels after path finishes ─────────────────
      .to('.map-label', {
        opacity: 1,
        y: -4,
        duration: 0.25,
        stagger: 0.3,
        ease: 'power2.out'
      }, '-=0.5');               // start 0.5s before path finishes
  }

  replayAnimation(): void {
    const path = document.querySelector('#trailPath') as SVGPathElement;

    // Reset everything first
    gsap.set(path, { drawSVG: '0%' });
    gsap.set('.map-label', { opacity: 0, y: 0 });

    // Re-run after reset
    setTimeout(() => this.animatePath(), 100);

  }

  // Helper — builds the transform string only when rotation is defined
  getTransform(label: MapLabel): string {
    if (label.rotate !== undefined) {
      return `rotate(${label.rotate}, ${label.rotatePivotX}, ${label.rotatePivotY})`;
    }
    return '';
  }

  getLineY(label: MapLabel, lineIndex: number): number {
    return label.y + lineIndex * (label.fontSize * 1.2);
  }


}
