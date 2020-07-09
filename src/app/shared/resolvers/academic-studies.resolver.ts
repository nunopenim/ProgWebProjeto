import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AcademicModel} from "../models/academic.model";
import {AcademicStudiesService} from "../services/academic-studies.service";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AcademicStudiesResolver implements Resolve<AcademicModel> {
  constructor(private academicStudiesService: AcademicStudiesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.academicStudiesService.findOneById(route.paramMap.get('id'));
  }
}
