export interface MapLabel {
    id: string;
    lines: string[];
    x: number;
    y: number;
    fontSize: number;
    rotate?: number;
    rotatePivotX?: number;
    rotatePivotY?: number;
    link: string;
    status: string;
    iconPath?: string;
    iconAlt?: string;
}

