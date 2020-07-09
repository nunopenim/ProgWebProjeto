import {Component, OnInit} from '@angular/core';
import {ProjectStorageService} from '../../shared/services/project-storage.service';
import {ProjectModel} from '../../shared/models/project.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteProjectModalComponent} from '../delete-project-modal.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  public projects: Array<ProjectModel> = new Array<ProjectModel>();

  constructor(public projectService: ProjectStorageService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.projectService.listProjects().subscribe((projects: Array<ProjectModel>) => {
      this.projects = projects;
    });
  }

  public deleteProject(id: string): void {
    const modalRef = this.modalService.open(DeleteProjectModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.projectService.deleteProject(id)
          .then(() => this.toasterService.success('Project deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }

}
