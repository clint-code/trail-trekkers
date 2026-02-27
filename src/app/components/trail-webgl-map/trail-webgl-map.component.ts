import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as PIXI from 'pixi.js';

interface Trail {
  id: string;
  stopNumber: number;
  title: string;
  date: string;
  description: string;
  difficulty: string;
  distance: string;
  elevation: string;
  x: number; // pixel X on your image
  y: number; // pixel Y on your image
}

@Component({
  selector: 'app-trail-webgl-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trail-webgl-map.component.html',
  styleUrl: './trail-webgl-map.component.css'
})
export class TrailWebglMapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('pixiCanvas', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  // ── Angular-side state ──────────────────────────────────
  selectedTrail: Trail | null = null;
  panelVisible = false;

  // ── Pixi internals ──────────────────────────────────────
  private app!: PIXI.Application;
  private camera!: PIXI.Container;         // everything lives in here
  private mapSprite!: PIXI.Sprite;
  private pathGraphics!: PIXI.Graphics;
  private pinContainer!: PIXI.Container;
  private pinSprites: PIXI.Container[] = [];

  // ── Camera state ────────────────────────────────────────
  private isDragging = false;
  private lastPointer = { x: 0, y: 0 };
  private currentScale = 1;
  private readonly MIN_ZOOM = 0.4;
  private readonly MAX_ZOOM = 4;

  // ── Pinch-to-zoom state ─────────────────────────────────
  private activeTouches: Map<number, { x: number; y: number; }> = new Map();
  private lastPinchDist = 0;

  // ── Image dimensions (update if yours differ) ───────────
  private readonly IMG_W = 1200;
  private readonly IMG_H = 1050;

  trails: Trail[] = [
    {
      id: 'sagana', stopNumber: 1,
      title: "Sagana's Scenic Splendor",
      date: '14th March',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Moderate', distance: '12 km', elevation: '1,400 m',
      x: 204, y: 294
    },
    {
      id: 'longonot', stopNumber: 2,
      title: "Longonot's Rim of Radiant Vistas",
      date: '11th April',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Moderate', distance: '18 km', elevation: '2,776 m',
      x: 600, y: 336
    },
    {
      id: 'kiima', stopNumber: 3,
      title: 'Kiima Kimwe: Crown of the County',
      date: '9th May',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Easy', distance: '8 km', elevation: '2,100 m',
      x: 960, y: 273
    },
    {
      id: 'gatamaiyu', stopNumber: 4,
      title: "Gatamaiyu's Green Grandeur",
      date: '13th June',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Easy', distance: '10 km', elevation: '1,800 m',
      x: 204, y: 630
    },
    {
      id: 'elephant', stopNumber: 5,
      title: 'Elephant Hill: Granite, Grit & Glory',
      date: '11th July',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Hard', distance: '22 km', elevation: '3,250 m',
      x: 600, y: 630
    },
    {
      id: 'kahunira', stopNumber: 6,
      title: "Kahunira's Woodland Waterways",
      date: '8th August',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Moderate', distance: '15 km', elevation: '2,400 m',
      x: 960, y: 609
    },
    {
      id: 'mtkenya', stopNumber: 7,
      title: 'Mt. Kenya: Crown of the Clouds',
      date: 'September 23–26th',
      description: 'ADD YOUR DESCRIPTION HERE.',
      difficulty: 'Expert', distance: '40 km', elevation: '5,199 m',
      x: 864, y: 893
    }
  ];

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    // Run all Pixi work outside Angular's zone for performance
    this.ngZone.runOutsideAngular(() => {
      this.initPixi();
    });
  }

  // ── 1. Bootstrap Pixi ─────────────────────────────────────
  private initPixi(): void {
    this.app = new PIXI.Application({
      resizeTo: this.canvasRef.nativeElement,
      backgroundColor: 0x0d0a07,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });

    const canvas = this.app.view as HTMLCanvasElement;
    canvas.style.display = 'block';
    canvas.tabIndex = 0; // makes canvas focusable

    this.canvasRef.nativeElement.appendChild(this.app.view as HTMLCanvasElement);

    // Camera container — pan/zoom transforms applied here
    this.camera = new PIXI.Container();
    this.app.stage.addChild(this.camera);

    this.loadMapTexture();
    this.setupEventListeners();
  }

  // ── 2. Load map image as GPU texture ─────────────────────
  private loadMapTexture(): void {
    const texture = PIXI.Texture.from('/assets/img/trail-to-the-throne-web-map.jpg');

    if (texture.baseTexture.valid) {
      this.onTextureLoaded(texture);
    } else {
      texture.baseTexture.on('loaded', () => this.onTextureLoaded(texture));
    }
  }

  private onTextureLoaded(texture: PIXI.Texture): void {
    // Map sprite
    this.mapSprite = new PIXI.Sprite(texture);
    this.mapSprite.width = this.IMG_W;
    this.mapSprite.height = this.IMG_H;
    this.camera.addChild(this.mapSprite);

    // Draw trail path
    this.pathGraphics = new PIXI.Graphics();
    this.camera.addChild(this.pathGraphics);
    this.drawTrailPath();

    // Add pins
    this.pinContainer = new PIXI.Container();
    this.camera.addChild(this.pinContainer);
    this.addPins();

    // Vignette overlay (drawn on stage, not camera — stays fixed)
    this.addVignetteOverlay();

    // Fly-in camera intro
    this.introAnimation();
  }

  // ── 3. Animated trail path ────────────────────────────────
  private pathProgress = 0;

  private drawTrailPath(): void {
    this.pathGraphics.clear();

    // Draw full dashed path first (subtle, faded)
    this.pathGraphics.lineStyle({
      width: 3,
      color: 0xd25a14,
      alpha: 0.25,
      cap: PIXI.LINE_CAP.ROUND,
      join: PIXI.LINE_JOIN.ROUND,
    });

    this.trails.forEach((trail, i) => {
      if (i === 0) this.pathGraphics.moveTo(trail.x, trail.y);
      else this.pathGraphics.lineTo(trail.x, trail.y);
    });

    // Animate the bright path drawing over the faded one
    this.animatePath();
  }

  private animatePath(): void {
    const totalPoints = this.trails.length;
    let progress = 0;
    const duration = 180; // frames ~3s at 60fps

    const animatedLine = new PIXI.Graphics();
    this.camera.addChild(animatedLine);

    // Declare first so it can self-reference
    let tickerFn: PIXI.TickerCallback<any>;

    tickerFn = () => {
      progress += 1 / duration;
      if (progress > 1) progress = 1;

      animatedLine.clear();
      animatedLine.lineStyle({
        width: 3,
        color: 0xd25a14,
        alpha: 0.9,
        cap: PIXI.LINE_CAP.ROUND,
        join: PIXI.LINE_JOIN.ROUND,
      });

      const totalSegments = totalPoints - 1;
      const segProgress = progress * totalSegments;
      const currentSeg = Math.floor(segProgress);
      const segFrac = segProgress - currentSeg;

      for (let i = 0; i <= currentSeg && i < totalSegments; i++) {
        const from = this.trails[i];
        const to = this.trails[i + 1];

        if (i === 0) animatedLine.moveTo(from.x, from.y);

        if (i < currentSeg) {
          animatedLine.lineTo(to.x, to.y);
        } else {
          animatedLine.lineTo(
            from.x + (to.x - from.x) * segFrac,
            from.y + (to.y - from.y) * segFrac
          );
        }
      }

      this.updateStopLabels(progress);

      if (progress >= 1) {
        this.app.ticker.remove(tickerFn); // ✅ now passing the correct function reference
      }
    };

    this.app.ticker.add(tickerFn);
  }

  // ── 4. Stop number labels on path ────────────────────────
  private stopLabels: PIXI.Text[] = [];

  private updateStopLabels(progress: number): void {
    const totalSegments = this.trails.length - 1;
    const segProgress = progress * totalSegments;
    const visibleUpTo = Math.floor(segProgress);

    this.trails.forEach((trail, i) => {
      if (i > visibleUpTo) return;
      if (this.stopLabels[i]) return; // already created

      const label = new PIXI.Text(`${trail.stopNumber}`, {
        fontFamily: 'serif',
        fontSize: 11,
        fill: 0xf5e9d0,
        align: 'center',
      });

      label.anchor.set(0.5);

      // Offset label slightly above the pin
      label.x = trail.x;
      label.y = trail.y - 28;
      label.alpha = 0;

      this.camera.addChild(label);
      this.stopLabels[i] = label;

      // Fade in
      let fadeInFn: PIXI.TickerCallback<any>;
      fadeInFn = () => {
        label.alpha += 0.05;
        if (label.alpha >= 1) {
          label.alpha = 1;
          this.app.ticker.remove(fadeInFn); // ✅
        }
      };
      this.app.ticker.add(fadeInFn);
    });
  }

  // ── 5. Pins ───────────────────────────────────────────────
  private addPins(): void {
    this.trails.forEach((trail, index) => {
      const pin = this.createPin(trail, index);
      this.pinContainer.addChild(pin);
      this.pinSprites.push(pin);
    });
  }

  private createPin(trail: Trail, index: number): PIXI.Container {
    const container = new PIXI.Container();
    container.x = trail.x;
    container.y = trail.y;
    container.alpha = 0;

    // Outer pulse ring
    const pulse = new PIXI.Graphics();
    this.drawCircle(pulse, 0xd25a14, 0, 22, 0.6);
    container.addChild(pulse);

    // Core circle
    const core = new PIXI.Graphics();
    this.drawCircle(core, 0xd25a14, 0, 14, 1);
    container.addChild(core);

    // Inner highlight
    const highlight = new PIXI.Graphics();
    this.drawCircle(highlight, 0xf5c87a, -3, 6, 0.4);
    container.addChild(highlight);

    // Stop number text
    const label = new PIXI.Text(`${trail.stopNumber}`, {
      fontFamily: 'serif',
      fontSize: 13,
      fontWeight: 'bold',
      fill: 0xffffff,
    });
    label.anchor.set(0.5);
    container.addChild(label);

    // Interactivity
    container.interactive = true;
    container.cursor = 'pointer';

    container.on('pointerover', () => {
      this.app.ticker.add(this.createScaleTicker(container, 1.3));
    });

    container.on('pointerout', () => {
      if (this.selectedTrail?.id !== trail.id) {
        this.app.ticker.add(this.createScaleTicker(container, 1.0));
      }
    });

    container.on('pointertap', () => {
      this.ngZone.run(() => this.onPinClick(trail, container));
    });

    // Pulse animation
    this.animatePin(pulse, index);

    // Staggered reveal
    let fadeInFn: PIXI.TickerCallback<any>;
    fadeInFn = () => {
      container.alpha += 0.05;
      if (container.alpha >= 1) {
        container.alpha = 1;
        this.app.ticker.remove(fadeInFn); // ✅
      }
    };
    this.app.ticker.add(fadeInFn);

    return container;
  }

  private drawCircle(
    g: PIXI.Graphics,
    color: number,
    offsetX: number,
    radius: number,
    alpha: number
  ): void {
    g.beginFill(color, alpha);
    g.drawCircle(offsetX, 0, radius);
    g.endFill();
  }

  private animatePin(pulse: PIXI.Graphics, index: number): void {
    let t = index * 0.4; // stagger start phase
    this.app.ticker.add(() => {
      t += 0.03;
      const s = 1 + Math.sin(t) * 0.35;
      pulse.scale.set(s);
      pulse.alpha = 0.5 - Math.sin(t) * 0.35;
    });
  }

  private createScaleTicker(container: PIXI.Container, targetScale: number) {
    const fn = () => {
      container.scale.x += (targetScale - container.scale.x) * 0.15;
      container.scale.y += (targetScale - container.scale.y) * 0.15;
      if (Math.abs(container.scale.x - targetScale) < 0.01) {
        container.scale.set(targetScale);
        this.app.ticker.remove(fn);
      }
    };
    return fn;
  }

  // ── 6. Vignette overlay ───────────────────────────────────
  private addVignetteOverlay(): void {
    const w = this.app.screen.width;
    const h = this.app.screen.height;

    const vignette = new PIXI.Graphics();

    // Dark edges — radial gradient approximated with concentric circles
    const steps = 12;
    for (let i = steps; i >= 0; i--) {
      const ratio = i / steps;
      const alpha = (1 - ratio) * 0.85;
      const rx = (w / 2) * (1 + ratio * 0.6);
      const ry = (h / 2) * (1 + ratio * 0.6);

      vignette.beginFill(0x0d0a07, alpha * 0.18);
      vignette.drawEllipse(w / 2, h / 2, rx, ry);
      vignette.endFill();
    }

    vignette.interactive = false;
    this.app.stage.addChild(vignette);

    // Redraw on resize
    window.addEventListener('resize', () => {
      this.app.stage.removeChild(vignette);
      this.addVignetteOverlay();
    });
  }

  // ── 7. Animated camera fly-in intro ──────────────────────
  private introAnimation(): void {
    // Start zoomed into center, then zoom out to fit
    const centerX = this.IMG_W / 2;
    const centerY = this.IMG_H / 2;
    const screenW = this.app.screen.width;
    const screenH = this.app.screen.height;

    // Final resting scale — fit image to screen
    const fitScale = Math.min(screenW / this.IMG_W, screenH / this.IMG_H) * 0.9;
    const initScale = fitScale * 1.8; // start zoomed in

    this.camera.scale.set(initScale);
    this.camera.x = screenW / 2 - centerX * initScale;
    this.camera.y = screenH / 2 - centerY * initScale;
    this.currentScale = initScale;

    let progress = 0;
    const duration = 120; // ~2s

    const intro = this.app.ticker.add(() => {
      progress += 1 / duration;
      if (progress > 1) progress = 1;

      const ease = this.easeOutCubic(progress);
      const scale = initScale + (fitScale - initScale) * ease;

      this.camera.scale.set(scale);
      this.camera.x = screenW / 2 - centerX * scale;
      this.camera.y = screenH / 2 - centerY * scale;
      this.currentScale = scale;

      let introFn: PIXI.TickerCallback<any>;
      introFn = () => {
        progress += 1 / duration;
        if (progress > 1) progress = 1;

        const ease = this.easeOutCubic(progress);
        const scale = initScale + (fitScale - initScale) * ease;

        this.camera.scale.set(scale);
        this.camera.x = screenW / 2 - centerX * scale;
        this.camera.y = screenH / 2 - centerY * scale;
        this.currentScale = scale;

        if (progress >= 1) {
          this.app.ticker.remove(introFn); // ✅
        }
      };
      this.app.ticker.add(introFn);
    });
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  // ── 8. Event listeners ────────────────────────────────────
  private setupEventListeners(): void {
    const canvas = this.app.view as HTMLCanvasElement;

    // Mouse drag
    canvas.addEventListener('mousedown', (e) => this.onDragStart(e.clientX, e.clientY));
    canvas.addEventListener('mousemove', (e) => this.onDragMove(e.clientX, e.clientY));
    canvas.addEventListener('mouseup', () => this.onDragEnd());
    canvas.addEventListener('mouseleave', () => this.onDragEnd());

    // Scroll zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      this.zoomAt(e.clientX, e.clientY, delta);
    }, { passive: false });

    // Touch — pan
    canvas.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    canvas.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }

  // ── Drag ─────────────────────────────────────────────────
  private onDragStart(x: number, y: number): void {
    this.isDragging = true;
    this.lastPointer = { x, y };
  }

  private onDragMove(x: number, y: number): void {
    if (!this.isDragging) return;
    const dx = x - this.lastPointer.x;
    const dy = y - this.lastPointer.y;
    this.camera.x += dx;
    this.camera.y += dy;
    this.clampCamera();
    this.lastPointer = { x, y };
  }

  private onDragEnd(): void {
    this.isDragging = false;
  }

  // ── Zoom ─────────────────────────────────────────────────
  private zoomAt(screenX: number, screenY: number, factor: number): void {
    const newScale = Math.min(
      Math.max(this.currentScale * factor, this.MIN_ZOOM),
      this.MAX_ZOOM
    );
    const actualFactor = newScale / this.currentScale;

    // Zoom toward cursor position
    this.camera.x = screenX - (screenX - this.camera.x) * actualFactor;
    this.camera.y = screenY - (screenY - this.camera.y) * actualFactor;
    this.camera.scale.set(newScale);
    this.currentScale = newScale;
    this.clampCamera();
  }

  // ── Touch ─────────────────────────────────────────────────
  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    Array.from(e.changedTouches).forEach(t => {
      this.activeTouches.set(t.identifier, { x: t.clientX, y: t.clientY });
    });

    if (this.activeTouches.size === 2) {
      const [a, b] = Array.from(this.activeTouches.values());
      this.lastPinchDist = this.distance(a, b);
    }

    if (this.activeTouches.size === 1) {
      const [touch] = Array.from(this.activeTouches.values());
      this.lastPointer = touch;
      this.isDragging = true;
    }
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    Array.from(e.changedTouches).forEach(t => {
      this.activeTouches.set(t.identifier, { x: t.clientX, y: t.clientY });
    });

    if (this.activeTouches.size === 2) {
      // Pinch zoom
      const [a, b] = Array.from(this.activeTouches.values());
      const dist = this.distance(a, b);
      const factor = dist / this.lastPinchDist;
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;

      this.zoomAt(midX, midY, factor);
      this.lastPinchDist = dist;

    } else if (this.activeTouches.size === 1 && this.isDragging) {
      // Single finger pan
      const [touch] = Array.from(this.activeTouches.values());
      this.onDragMove(touch.x, touch.y);
      this.lastPointer = touch;
    }
  }

  private onTouchEnd(e: TouchEvent): void {
    Array.from(e.changedTouches).forEach(t => {
      this.activeTouches.delete(t.identifier);
    });
    if (this.activeTouches.size === 0) this.isDragging = false;
  }

  private distance(a: { x: number; y: number; }, b: { x: number; y: number; }): number {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  // ── Camera bounds ─────────────────────────────────────────
  private clampCamera(): void {
    const sw = this.app.screen.width;
    const sh = this.app.screen.height;
    const s = this.currentScale;

    const minX = sw - this.IMG_W * s;
    const minY = sh - this.IMG_H * s;

    this.camera.x = Math.min(Math.max(this.camera.x, minX), 0);
    this.camera.y = Math.min(Math.max(this.camera.y, minY), 0);
  }

  // ── Pin click → Angular side panel ───────────────────────
  onPinClick(trail: Trail, pin: PIXI.Container): void {
    if (this.selectedTrail?.id === trail.id) {
      this.closePanel();
      return;
    }
    this.selectedTrail = trail;
    this.panelVisible = true;

    // Scale up selected pin
    this.pinSprites.forEach(p => this.app.ticker.add(this.createScaleTicker(p, 1.0)));
    this.app.ticker.add(this.createScaleTicker(pin, 1.4));
  }

  closePanel(): void {
    this.panelVisible = false;
    this.pinSprites.forEach(p => this.app.ticker.add(this.createScaleTicker(p, 1.0)));
    setTimeout(() => (this.selectedTrail = null), 420);
  }

  ngOnDestroy(): void {
    this.app?.destroy(true);
  }
}