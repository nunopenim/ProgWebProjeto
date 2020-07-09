import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AcademicModel} from "../../../shared/models/academic.model";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AcademicStudiesService} from "../../../shared/services/academic-studies.service";

@Component({
  selector: 'app-update-academic-studies',
  templateUrl: './update-academic-studies.component.html',
  styleUrls: ['./update-academic-studies.component.scss']
})
export class UpdateAcademicStudiesComponent implements OnInit {
  public academicStudies: AcademicModel;
  public academicStudiesForm: FormGroup;
  public isSaving = false;
  public edit = false;

  constructor(public formBuilder: FormBuilder, public academicStudiesService: AcademicStudiesService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.edit = !!this.activatedRoute.snapshot.data.academic;
    this.academicStudiesForm = this.formBuilder.group({
      educationalInstitution: new FormControl('', [Validators.required]),
      formation: new FormControl('', [Validators.required]),
      fieldOfStudy: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      grade: new FormControl('', [Validators.min(0), Validators.max(20)]),
      activities: new FormControl(''),
      description: new FormControl(''),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.academicStudiesForm.patchValue(this.activatedRoute.snapshot.data.academic);
    }
  }

  public updateAcademicStudies(): void {
    this.isSaving = true;
    this.academicStudies = this.academicStudiesForm.getRawValue();
    if (this.edit) {
      this.academicStudies.id = this.activatedRoute.snapshot.data.academic.id;
      this.academicStudiesService.updateAcademicStudies(this.academicStudies)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.academicStudiesService.addAcademicStudies(this.academicStudies)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.academicStudiesForm.get(formControlName).invalid
      && (this.academicStudiesForm.get(formControlName).dirty || this.academicStudiesForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.academicStudiesForm.get(formControlName).errors
      && this.academicStudiesForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit Academic Study' : 'Add Academic Study';
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-academic-studies']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }
}
