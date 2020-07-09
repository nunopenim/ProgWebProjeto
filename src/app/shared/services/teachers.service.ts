import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {CollectionReference} from "@angular/fire/firestore/interfaces";
import {first, switchMap} from "rxjs/operators";

import {TeacherModel} from "../models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private readonly TEACHER_KEY = 'teachers';
  private find;

  constructor(public fireStoreService: AngularFirestore) {
  }

  public addTeacher(teacher: TeacherModel): Promise<void> {
    teacher.id = this.fireStoreService.createId();
    return this.fireStoreService.collection<TeacherModel>(this.TEACHER_KEY).doc(teacher.id).set(teacher);
  }

  public listTeachers(): Observable<Array<TeacherModel>> {
    return this.fireStoreService.collection<TeacherModel>(this.TEACHER_KEY).valueChanges();
  }

  public updateTeacher(teacherModel: TeacherModel): Promise<void> {
    return this.fireStoreService.collection<TeacherModel>(this.TEACHER_KEY).doc(teacherModel.id).set(teacherModel);
  }

  public deleteTeacher(teacherId: string): Promise<void> {
    return this.fireStoreService.collection<TeacherModel>(this.TEACHER_KEY).doc(teacherId).delete();
  }

  public findOneById(id?: string): Observable<TeacherModel> {
    return this.fireStoreService.collection<TeacherModel>(this.TEACHER_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }
}
