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

// export interface MapLabel {
//     id: number;
//     slug: string;
//     title: {
//         rendered: string;
//     };
//     link: string;
//     acf: {
//         hike_banner_image: {
//             url: string;
//             alt: string;
//         };
//         hike_location: string;
//         level_of_difficulty: string;
//         hike_summary: string;
//         featured_image: {
//             url: string;
//             alt: string;
//             title: string;
//         };
//         date: string;
//         metadata_collection: {
//             hike_status: boolean;
//             x_axis_label_position: string;
//             y_axis_label_position: string;
//             map_label_font_size: string;
//             map_rotate_value: string;
//             rotate_pivot_x_axis: string;
//             rotate_pivot_y_axis: string;
//         };
//     };
// }