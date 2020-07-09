import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {TeacherModel} from "../models/teacher.model";
import {TeachersService} from "../services/teachers.service";

@Injectable({ providedIn: 'root' })
export class TeachersResolver implements Resolve<TeacherModel>{
  constructor(private TeachersService: TeachersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | any {
    return this.TeachersService.findOneById(route.paramMap.get('id'));
  }
}
