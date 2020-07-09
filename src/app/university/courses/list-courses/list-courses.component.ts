import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {DeleteCoursesModalComponent} from '../delete-courses-modal.component';
import {CourseModel} from '../../../shared/models/course.model';
import {CoursesService} from '../../../shared/services/courses.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})

export class ListCoursesComponent implements OnInit {

  public courses: Array<CourseModel> = new Array<CourseModel>();
  public text: string = "";

  constructor(public courseModelService: CoursesService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.courseModelService.listCourses().subscribe((courseModels: Array<CourseModel>) => {
      this.courses = courseModels;
    });
  }

  public deleteCourse(id: string): void {
    const modalRef = this.modalService.open(DeleteCoursesModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.courseModelService.deleteCourse(id)
          .then(() => this.toasterService.success('Course deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }

  public searchField(): void {
    this.text = (<HTMLInputElement>document.getElementById("textInput")).value;
  }

}
