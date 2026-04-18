import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { Preloader } from '../../utils/preloader';


@Component({
  selector: 'app-indemnity-clause',
  standalone: true,
  imports: [
    PreloaderComponent,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './indemnity-clause.component.html',
  styleUrl: './indemnity-clause.component.css'
})

export class IndemnityClauseComponent {

  siteImages: any = [];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.document.documentElement.scrollTop = 0;
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.siteImages = Preloader.getImages();
    }, 1000);

  }
}
