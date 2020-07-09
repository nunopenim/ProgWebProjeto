import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-project-modal',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Delete project</h4>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <p>Do you wish to delete this project?</p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close(false)">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="activeModal.close(true)">Ok</button>
      </div>
  `,
  styles: []
})
export class DeleteProjectModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
