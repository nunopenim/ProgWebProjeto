import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CourseModel} from "../models/course.model";
import {Observable} from 'rxjs';
import {CoursesService} from "../services/courses.service";

@Injectable({ providedIn: 'root' })
export class CoursesResolver implements Resolve<CourseModel> {
  constructor(private CourseService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | any {
    return this.CourseService.findOneById(route.paramMap.get('id'));
  }
}
