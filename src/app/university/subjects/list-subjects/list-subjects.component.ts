import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {DeleteSubjectsModalComponent} from "../delete-subjects-modal.component";
import {SubjectModel} from "../../../shared/models/subject.model";
import {SubjectsService} from "../../../shared/services/subjects.service";

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.scss']
})

export class ListSubjectsComponent implements OnInit {

  public subjects: Array<SubjectModel> = new Array<SubjectModel>();

  constructor(public subjectModelService: SubjectsService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.subjectModelService.listSubject().subscribe((subjectModels: Array<SubjectModel>) => {
      this.subjects = subjectModels;
    });
  }

  public deleteSubject(id: string): void {
    const modalRef = this.modalService.open(DeleteSubjectsModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.subjectModelService.deleteSubject(id)
          .then(() => this.toasterService.success('Subject deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }

}
