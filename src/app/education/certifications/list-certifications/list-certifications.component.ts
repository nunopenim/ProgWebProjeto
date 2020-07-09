import { Component, OnInit } from '@angular/core';
import {CertificationModel} from "../../../shared/models/certification.model";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CertificationsService} from "../../../shared/services/certifications.service";
import  {DeleteCertificationModalComponent} from "../delete-certification-modal.component";

@Component({
  selector: 'app-list-certifications',
  templateUrl: './list-certifications.component.html',
  styleUrls: ['./list-certifications.component.scss']
})
export class ListCertificationsComponent implements OnInit {

  public certifications: Array<CertificationModel> = new Array<CertificationModel>();

  constructor(public certificationModelService: CertificationsService, public toasterService: ToastrService,
              private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.certificationModelService.listCertification().subscribe((certificationModels: Array<CertificationModel>) => {
      this.certifications = certificationModels;
    });
  }

  public deleteCertification(id: string): void {
    const modalRef = this.modalService.open(DeleteCertificationModalComponent);
    modalRef.result.then(val => {
      if (val) {
        this.certificationModelService.deleteCertification(id)
          .then(() => this.toasterService.success('Certification deleted'))
          .catch(() => this.toasterService.error('Error in operation'));
      }
    });
  }

}
