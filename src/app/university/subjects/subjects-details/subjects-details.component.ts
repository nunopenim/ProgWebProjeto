import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {SubjectModel} from "../../../shared/models/subject.model";

@Component({
  selector: 'app-subjects-details',
  templateUrl: './subjects-details.component.html',
  styleUrls: ['./subjects-details.component.scss']
})
export class SubjectsDetailsComponent implements OnInit {

  public subject: SubjectModel = new SubjectModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.subject = new SubjectModel(this.activatedRoute.snapshot.data.subject);
  }

  public previousState(): void {
    this.location.back();
  }
}
