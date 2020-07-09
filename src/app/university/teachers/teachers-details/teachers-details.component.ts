import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {TeacherModel} from "../../../shared/models/teacher.model";

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.scss']
})
export class TeachersDetailsComponent implements OnInit {

  public teacher: TeacherModel = new TeacherModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.teacher = new TeacherModel(this.activatedRoute.snapshot.data.teacher);
  }

  public previousState(): void {
    this.location.back();
  }
}
