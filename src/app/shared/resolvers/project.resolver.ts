import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProjectModel} from '../models/project.model';
import {ProjectStorageService} from '../services/project-storage.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<ProjectModel> {
  constructor(private projectService: ProjectStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.projectService.findOneById(route.paramMap.get('id'));
  }
}
