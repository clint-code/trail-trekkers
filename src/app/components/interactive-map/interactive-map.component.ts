import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  selectedTrail: Trail | null = null;
  panelVisible = false;
  pathDrawn = false;


  pins = [
    { id: 'sagana', cx: 68, cy: 155, label: "Sagana's Scenic Splendor" },
    { id: 'longonot', cx: 200, cy: 165, label: "Longonot's Rim" },
    { id: 'kiima', cx: 375, cy: 175, label: "Kiima Kimwe" },
  ];

  onPinClick(pin: any) {
    console.log('Clicked:', pin.label);
  }

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
      x: 800,
      y: 500,
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

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

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
