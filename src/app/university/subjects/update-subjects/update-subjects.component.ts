import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {SubjectModel} from "../../../shared/models/subject.model";
import {SubjectsService} from "../../../shared/services/subjects.service";

@Component({
  selector: 'app-update-subjects',
  templateUrl: './update-subjects.component.html',
  styleUrls: ['./update-subjects.component.scss']
})
export class UpdateSubjectsComponent implements OnInit {

  public subject: SubjectModel;
  public subjectForm: FormGroup;
  public isSaving = false;
  public edit = false;

  constructor(public formBuilder: FormBuilder, public subjectService: SubjectsService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.edit = !!this.activatedRoute.snapshot.data.subject;
    this.subjectForm = this.formBuilder.group({
      subjectName: new FormControl('', [Validators.required]),
      subjectUrl: new FormControl(''),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.subjectForm.patchValue(this.activatedRoute.snapshot.data.subject);
    }
  }

  public updateSubject(): void {
    this.isSaving = true;
    this.subject = this.subjectForm.getRawValue();
    if (this.edit) {
      this.subject.id = this.activatedRoute.snapshot.data.subject.id;
      this.subjectService.updateSubject(this.subject)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.subjectService.addSubject(this.subject)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.subjectForm.get(formControlName).invalid
      && (this.subjectForm.get(formControlName).dirty || this.subjectForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.subjectForm.get(formControlName).errors
      && this.subjectForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit Subject' : 'Add Subject';
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-subjects']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }

}
