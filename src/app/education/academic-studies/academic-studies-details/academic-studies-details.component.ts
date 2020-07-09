import { Component, OnInit } from '@angular/core';
import {AcademicModel} from "../../../shared/models/academic.model";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-academic-studies-details',
  templateUrl: './academic-studies-details.component.html',
  styleUrls: ['./academic-studies-details.component.scss']
})
export class AcademicStudiesDetailsComponent implements OnInit {

  public academicStudies: AcademicModel = new AcademicModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.academicStudies = new AcademicModel(this.activatedRoute.snapshot.data.academic);
  }

  public previousState(): void {
    this.location.back();
  }
}
