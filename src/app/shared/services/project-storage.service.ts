import {Injectable} from '@angular/core';
import {ProjectModel} from '../models/project.model';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';
import {CollectionReference} from '@angular/fire/firestore/interfaces';
import {Observable, of} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectStorageService {

  private readonly PROJECT_KEY = 'projects';
  private find

  constructor(public fireStoreService: AngularFirestore) {
  }

  public addProject(project: any): Promise<void> {
    project.id = this.fireStoreService.createId();
    project.projectTeamMembers.forEach(ptm => ptm.id = this.fireStoreService.createId());
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY).doc(project.id).set(project);
  }

  public listProjects(): Observable<Array<ProjectModel>> {
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY).valueChanges();
  }

  public updateProject(project: ProjectModel): Promise<void> {
    project.projectTeamMembers.filter(ptm => !ptm.id).forEach(ptmFiltered => ptmFiltered.id = this.fireStoreService.createId());
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY).doc(project.id).set(project);
  }

  public deleteProject(projectId: string): Promise<void> {
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY).doc(projectId).delete();
  }

  public findOneById(id?: string): Observable<ProjectModel> {
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY,
      (ref: CollectionReference) => ref.where('id', '==', id))
      .valueChanges().pipe(first(), switchMap(val => of(val[0])));
  }

  public findPersonalProjects(): Observable<Array<ProjectModel>> {
    return this.findProjectsByType(true);
  }

  public findOtherProjects(): Observable<Array<ProjectModel>> {
    return this.findProjectsByType(false);
  }

  public findProjectsByType(projectType: boolean): Observable<Array<ProjectModel>> {
    return this.fireStoreService.collection<ProjectModel>(this.PROJECT_KEY,
      (ref: CollectionReference) => ref.where('personalProject', '==', projectType))
      .valueChanges().pipe(map(projects => projects.map(p => new ProjectModel(p))));
  }
}
