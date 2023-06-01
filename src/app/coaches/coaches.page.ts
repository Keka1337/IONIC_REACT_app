import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.page.html',
  styleUrls: ['./coaches.page.scss'],
})
export class CoachesPage implements OnInit {
  @ViewChild('pageTop') pageTop!: IonContent;

  constructor() {}

  ngOnInit() {}

  public pageScroller() {
    this.pageTop.scrollToTop();
  }
}
