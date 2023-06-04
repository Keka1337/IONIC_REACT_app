import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  @ViewChild('pageTop') pageTop!: IonContent;

  constructor() {}

  ngOnInit() {}

  public pageScroller() {
    this.pageTop.scrollToTop();
  }
}
