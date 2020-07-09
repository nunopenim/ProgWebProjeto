import {Component, OnInit} from '@angular/core';
import {ProjectModel} from '../shared/models/project.model';
import {Observable} from 'rxjs';
import {ProjectStorageService} from '../shared/services/project-storage.service';

@Component({
  selector: 'app-other-projects',
  template: `
      <div class="row padding-40">
          <div class="col-12 margin-bottom-25">
              <h3>My Other Projects</h3>
          </div>
          <ng-container *ngIf="(projects$ | async) as projs">
              <ng-container *ngIf="projs.length > 0">
                  <div class="col-sm-6 col-md-4 col-lg-3 margin-bottom-30" *ngFor="let proj of projs">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">{{proj.projectTitle()}}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">{{proj.projectCompanyDetails()}}</h6>
                              <p class="card-text">{{proj.locationDetails()}}</p>
                              <a class="card-link" [routerLink]="['../project-details', proj.id]">View details</a>
                          </div>
                      </div>
                  </div>
              </ng-container>
              <ng-container *ngIf="projs.length === 0">
                  <div class="col-12">
                      <div class="alert alert-warning" role="alert">
                          No other projects were found
                      </div>
                  </div>
              </ng-container>
          </ng-container>
      </div>
  `,
  styles: []
})
export class OtherProjectsComponent implements OnInit {

  public projects$: Observable<Array<ProjectModel>>;

  constructor(private projectStorageService: ProjectStorageService) {
  }

  public ngOnInit(): void {
    this.projects$ = this.projectStorageService.findOtherProjects();
  }

}
