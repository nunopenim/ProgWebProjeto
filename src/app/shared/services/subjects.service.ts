import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {CollectionReference} from "@angular/fire/firestore/interfaces";
import {first, switchMap} from "rxjs/operators";

import {SubjectModel} from "../models/subject.model";

@Injectable({
  providedIn: 'root'
})

export class SubjectsService {

  private readonly SUBJECT_KEY = 'subjects';
  private find;

  constructor(public fireStoreService: AngularFirestore) {
  }

  public addSubject(subject: SubjectModel): Promise<void> {
    subject.id = this.fireStoreService.createId();
    return this.fireStoreService.collection<SubjectModel>(this.SUBJECT_KEY).doc(subject.id).set(subject);
  }

  public listSubject(): Observable<Array<SubjectModel>> {
    return this.fireStoreService.collection<SubjectModel>(this.SUBJECT_KEY).valueChanges();
  }

  public updateSubject(subjectModel: SubjectModel): Promise<void> {
    return this.fireStoreService.collection<SubjectModel>(this.SUBJECT_KEY).doc(subjectModel.id).set(subjectModel);
  }

  public deleteSubject(subjectId: string): Promise<void> {
    return this.fireStoreService.collection<SubjectModel>(this.SUBJECT_KEY).doc(subjectId).delete();
  }

  public findOneById(id?: string): Observable<SubjectModel> {
    return this.fireStoreService.collection<SubjectModel>(this.SUBJECT_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }
}
