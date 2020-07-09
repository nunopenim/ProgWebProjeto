import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AcademicModel} from "../models/academic.model";
import {Observable, of} from "rxjs";
import {CollectionReference} from "@angular/fire/firestore/interfaces";
import {first, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AcademicStudiesService {

  private readonly ACADEMIC_STUDIES_KEY = 'academicStudies';
  private find;

  constructor(public fireStoreService: AngularFirestore) {
  }

  public addAcademicStudies(academicStudies: AcademicModel): Promise<void> {
    academicStudies.id = this.fireStoreService.createId();
    return this.fireStoreService.collection<AcademicModel>(this.ACADEMIC_STUDIES_KEY).doc(academicStudies.id).set(academicStudies);
  }

  public listAcademicStudies(): Observable<Array<AcademicModel>> {
    return this.fireStoreService.collection<AcademicModel>(this.ACADEMIC_STUDIES_KEY).valueChanges();
  }

  public updateAcademicStudies(academicModel: AcademicModel): Promise<void> {
    return this.fireStoreService.collection<AcademicModel>(this.ACADEMIC_STUDIES_KEY).doc(academicModel.id).set(academicModel);
  }

  public deleteAcademicStudies(academicStudiesId: string): Promise<void> {
    return this.fireStoreService.collection<AcademicModel>(this.ACADEMIC_STUDIES_KEY).doc(academicStudiesId).delete();
  }

  public findOneById(id?: string): Observable<AcademicModel> {
    return this.fireStoreService.collection<AcademicModel>(this.ACADEMIC_STUDIES_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }
}
