import { Component, OnInit } from '@angular/core';

import {TeacherModel} from '../../shared/models/teacher.model';
import {TeachersService} from '../../shared/services/teachers.service';
import {SubjectModel} from '../../shared/models/subject.model';
import {SubjectsService} from '../../shared/services/subjects.service';
import {CourseModel} from '../../shared/models/course.model';
import {CoursesService} from '../../shared/services/courses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public teachers: Array<TeacherModel> = new Array<TeacherModel>();
  public subjects: Array<SubjectModel> = new Array<SubjectModel>();
  public courses: Array<CourseModel> = new Array<CourseModel>();

  // Apenas não tenho paciencia para deixar bonito!
  // tslint:disable-next-line:max-line-length
  constructor(public teacherModelService: TeachersService, public subjectModelService: SubjectsService, public courseModelService: CoursesService) {
  }

  public ngOnInit(): void {
    this.teacherModelService.listTeachers().subscribe((teachersModels: Array<TeacherModel>) => {
      this.teachers = teachersModels;
    });
    this.subjectModelService.listSubject().subscribe((subjectModels: Array<SubjectModel>) => {
      this.subjects = subjectModels;
    });
    this.courseModelService.listCourses().subscribe((courseModels: Array<CourseModel>) => {
      this.courses = courseModels;
    });
  }

  /*private initDetailsArray(): void {

    const firstDetail: DetailModel = new DetailModel();
    firstDetail.headerText = 'Teachers';
    firstDetail.contentText = `Detail 1 : Estes detalhes estão em main.component.ts, para referencia futura`;
    firstDetail.buttonText = 'View more';
    firstDetail.icon = 'bi-chevron-bar-right';

    this.details.push(firstDetail);

  }*/

}
