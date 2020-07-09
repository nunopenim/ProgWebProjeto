import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {ProjectModel} from '../../shared/models/project.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  public project: ProjectModel = new ProjectModel();

  constructor(public activatedRoute: ActivatedRoute, private location: Location) { }

  public ngOnInit(): void {
    this.project = new ProjectModel(this.activatedRoute.snapshot.data.project);
  }

  public previousState(): void {
    this.location.back();
  }

}
