import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {CourseModel} from "../../../shared/models/course.model";

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit {

  public course: CourseModel = new CourseModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.course = new CourseModel(this.activatedRoute.snapshot.data.course);
  }

  public previousState(): void {
    this.location.back();
  }
}
