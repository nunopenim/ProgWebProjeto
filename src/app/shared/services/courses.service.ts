import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {CollectionReference} from '@angular/fire/firestore/interfaces';
import {first, switchMap} from 'rxjs/operators';
import {CourseModel} from "../models/course.model";
import {TeachersService} from "./teachers.service";
import {SubjectsService} from "./subjects.service";

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private readonly COURSES_KEY = 'courses';
  private find;

  constructor(public fireStoreService: AngularFirestore, public teachersService : TeachersService, public subjectsService : SubjectsService) {
  }

  public addCourse(course: CourseModel): Promise<void> {
    course.id = this.fireStoreService.createId();

    course.teachersCourse.forEach(ptm => {
      if(!ptm.id) {
        ptm.id = this.fireStoreService.createId()
      }
    });
    course.subjectsCourse.forEach(ptm => {
      if(!ptm.id) {
        ptm.id = this.fireStoreService.createId()
      }
    });

    course.teachersCourse.forEach(ptm => {
      if(!ptm.id) {
        this.teachersService.addTeacher(ptm)
      } else {
        this.teachersService.updateTeacher(ptm)
      }
    });

    course.subjectsCourse.forEach(ptm => {
      if(!ptm.id) {
        this.subjectsService.addSubject(ptm)
      } else {
        this.subjectsService.updateSubject(ptm)
      }
    });

    return this.fireStoreService.collection<CourseModel>(this.COURSES_KEY).doc(course.id).set(course);
  }

  public listCourses(): Observable<Array<CourseModel>> {
    return this.fireStoreService.collection<CourseModel>(this.COURSES_KEY).valueChanges();
  }

  public updateCourse(courseModel: CourseModel): Promise<void> {
    courseModel.teachersCourse.forEach(ptm => {
      if(!ptm.id) {
        ptm.id = this.fireStoreService.createId()
      }
    });
    courseModel.subjectsCourse.forEach(ptm => {
      if(!ptm.id) {
        ptm.id = this.fireStoreService.createId()
      }
    });

    courseModel.teachersCourse.forEach(ptm => {
      if(!ptm.id) {
        this.teachersService.addTeacher(ptm)
      } else {
        this.teachersService.updateTeacher(ptm)
      }
    });

    courseModel.subjectsCourse.forEach(ptm => {
      if(!ptm.id) {
        this.subjectsService.addSubject(ptm)
      } else {
        this.subjectsService.updateSubject(ptm)
      }
    });

    return this.fireStoreService.collection<CourseModel>(this.COURSES_KEY).doc(courseModel.id).set(courseModel);
  }

  public deleteCourse(courseId: string): Promise<void> {
    return this.fireStoreService.collection<CourseModel>(this.COURSES_KEY).doc(courseId).delete();
  }

  public findOneById(id?: string): Observable<CourseModel> {
    return this.fireStoreService.collection<CourseModel>(this.COURSES_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }
}
