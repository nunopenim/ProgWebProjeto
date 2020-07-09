import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CertificationModel} from "../../../shared/models/certification.model";

@Component({
  selector: 'app-certifications-details',
  templateUrl: './certifications-details.component.html',
  styleUrls: ['./certifications-details.component.scss']
})
export class CertificationsDetailsComponent implements OnInit {

  public certification: CertificationModel = new CertificationModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.certification = new CertificationModel(this.activatedRoute.snapshot.data.certification);
  }

  public previousState(): void {
    this.location.back();
  }
}
