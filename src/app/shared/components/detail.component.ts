import {Component, Input, OnInit} from '@angular/core';
import {DetailModel} from '../models/detail.model';

@Component({
  selector: 'app-detail',
  template: `
      <div>
          <h3>{{detail.headerText}}</h3>
          <p>{{detail.contentText}}</p>
          <app-button [text]="detail.buttonText" [icon]="detail.icon"></app-button>
      </div>
  `,
  styles: []
})
export class DetailComponent implements OnInit {

  @Input()
  public detail: DetailModel;

  constructor() { }

  ngOnInit() {
  }

}
