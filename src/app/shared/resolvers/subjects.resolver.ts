import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {SubjectModel} from "../models/subject.model";
import {SubjectsService} from "../services/subjects.service";

@Injectable({ providedIn: 'root' })
export class SubjectsResolver implements Resolve<SubjectModel> {
  constructor(private SubjectsService: SubjectsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | any {
    return this.SubjectsService.findOneById(route.paramMap.get('id'));
  }
}
