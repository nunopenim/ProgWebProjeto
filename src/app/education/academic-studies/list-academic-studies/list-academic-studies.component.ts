import { Component, OnInit } from '@angular/core';
import {AcademicModel} from "../../../shared/models/academic.model";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteAcademicStudiesModalComponent} from "../delete-academic-studies-modal.component";
import {AcademicStudiesService} from "../../../shared/services/academic-studies.service";

@Component({
  selector: 'app-list-academic-studies',
  templateUrl: './list-academic-studies.component.html',
  styleUrls: ['./list-academic-studies.component.scss']
})
export class ListAcademicStudiesComponent implements OnInit {

  public academicStudies: Array<AcademicModel> = new Array<AcademicModel>();

  constructor(public academicModelService: AcademicStudiesService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.academicModelService.listAcademicStudies().subscribe((academicModels: Array<AcademicModel>) => {
      this.academicStudies = academicModels;
    });
  }

  public deleteAcademicStudies(id: string): void {
    const modalRef = this.modalService.open(DeleteAcademicStudiesModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.academicModelService.deleteAcademicStudies(id)
          .then(() => this.toasterService.success('Academic Study deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }

}
