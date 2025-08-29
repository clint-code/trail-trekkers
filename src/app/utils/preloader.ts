import * as $ from 'jquery';

export class Preloader {

    public static pageImages: any = [];

    static getImages(): any {

        this.pageImages = [];

        $("img").each((index, value) => {

            if ($(value).attr("src") != "" || $(value).attr("src") == "undefined" || $(value).attr("src") == null) {

                this.pageImages.push($(value).attr("src"));

            }

        });

        return this.pageImages;

    }

    static getImageCount(): number {

        return $("img").length;

    }

    static test(): number {

        return $("img").length;

    }



}
