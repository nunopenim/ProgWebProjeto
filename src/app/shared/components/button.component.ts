import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="btn btn-primary btn-lg">{{text}}
      <svg width="1em" height="1em" viewBox="0 0 16 16"
           fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 5px">
        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"/>
      </svg>
    </button>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {

  @Input()
  public text: string;
  @Input()
  public icon: string;

  constructor() {
  }

  ngOnInit() {
  }

}
