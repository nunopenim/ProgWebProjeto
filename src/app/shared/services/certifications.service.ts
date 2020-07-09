import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {CollectionReference} from "@angular/fire/firestore/interfaces";
import {first, switchMap} from "rxjs/operators";

import {CertificationModel} from "../models/certification.model";

@Injectable({
  providedIn: 'root'
})

export class CertificationsService {

  private readonly CERTIFICATION_KEY = 'certifications';
  private find;

  constructor(public fireStoreService: AngularFirestore) {
  }

  public addCertification(certification: CertificationModel): Promise<void> {
    certification.id = this.fireStoreService.createId();
    return this.fireStoreService.collection<CertificationModel>(this.CERTIFICATION_KEY).doc(certification.id).set(certification);
  }

  public listCertification(): Observable<Array<CertificationModel>> {
    return this.fireStoreService.collection<CertificationModel>(this.CERTIFICATION_KEY).valueChanges();
  }

  public updateCertification(certificationModel: CertificationModel): Promise<void> {
    return this.fireStoreService.collection<CertificationModel>(this.CERTIFICATION_KEY).doc(certificationModel.id).set(certificationModel);
  }

  public deleteCertification(certificationId: string): Promise<void> {
    return this.fireStoreService.collection<CertificationModel>(this.CERTIFICATION_KEY).doc(certificationId).delete();
  }

  public findOneById(id?: string): Observable<CertificationModel> {
    return this.fireStoreService.collection<CertificationModel>(this.CERTIFICATION_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }
}
