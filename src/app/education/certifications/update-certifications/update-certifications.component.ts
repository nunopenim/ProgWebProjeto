import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CertificationModel} from "../../../shared/models/certification.model";
import {CertificationsService} from "../../../shared/services/certifications.service";

@Component({
  selector: 'app-update-certifications',
  templateUrl: './update-certifications.component.html',
  styleUrls: ['./update-certifications.component.scss']
})
export class UpdateCertificationComponent implements OnInit {

  public certification: CertificationModel;
  public certificationForm: FormGroup;
  public isSaving = false;
  public edit = false;

  constructor(public formBuilder: FormBuilder, public certificationService: CertificationsService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.edit = !!this.activatedRoute.snapshot.data.certification;
    this.certificationForm = this.formBuilder.group({
      certName: new FormControl('', [Validators.required]),
      issuingOrg: new FormControl('', [Validators.required]),
      expires: new FormControl('', [Validators.required]),
      issuingDate: new FormControl('', [Validators.required]),
      expireDate: new FormControl('', [Validators.required]),
      certCode: new FormControl('', [Validators.required]),
      certUrl: new FormControl(''),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.certificationForm.patchValue(this.activatedRoute.snapshot.data.certification);
    }
  }

  public updateCertification(): void {
    this.isSaving = true;
    this.certification = this.certificationForm.getRawValue();
    if (this.edit) {
      this.certification.id = this.activatedRoute.snapshot.data.certification.id;
      this.certificationService.updateCertification(this.certification)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.certificationService.addCertification(this.certification)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.certificationForm.get(formControlName).invalid
      && (this.certificationForm.get(formControlName).dirty || this.certificationForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.certificationForm.get(formControlName).errors
      && this.certificationForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit Certification' : 'Add Certification';
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-certifications']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }

}

