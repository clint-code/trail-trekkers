import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
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


  svgContent: SafeHtml = '';
  svgViewBox = '0 0 2418.725 892.484';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadSvg();

  }

  ngAfterViewInit(): void {

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
