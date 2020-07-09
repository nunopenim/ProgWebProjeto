import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {CertificationModel} from "../models/certification.model";
import {CertificationsService} from "../services/certifications.service";

@Injectable({ providedIn: 'root' })
export class CertificationsResolver implements Resolve<CertificationModel> {
  constructor(private CertificationsService: CertificationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<any> | Promise<any> | any {
    return this.CertificationsService.findOneById(route.paramMap.get('id'));
  }
}
