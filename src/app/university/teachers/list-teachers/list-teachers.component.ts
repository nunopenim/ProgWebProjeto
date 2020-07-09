import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {DeleteTeacherModalComponent} from "../delete-teacher-modal.component";
import {TeacherModel} from "../../../shared/models/teacher.model";
import {TeachersService} from "../../../shared/services/teachers.service";

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})

export class ListTeachersComponent implements OnInit {

  public teachers: Array<TeacherModel> = new Array<TeacherModel>();

  constructor(public teacherModelService: TeachersService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.teacherModelService.listTeachers().subscribe((teachersModels: Array<TeacherModel>) => {
      this.teachers = teachersModels;
    });
  }

  public deleteTeacher(id: string): void {
    const modalRef = this.modalService.open(DeleteTeacherModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.teacherModelService.deleteTeacher(id)
          .then(() => this.toasterService.success('Teacher deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }
}
