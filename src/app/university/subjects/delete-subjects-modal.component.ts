import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-subjects-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Delete subject</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Do you wish to delete this subject?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close(false)">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close(true)">Ok</button>
    </div>
  `,
  styles: []
})
export class DeleteSubjectsModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
