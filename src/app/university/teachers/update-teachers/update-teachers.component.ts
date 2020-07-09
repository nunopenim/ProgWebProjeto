import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

import {TeacherModel} from "../../../shared/models/teacher.model";
import {TeachersService} from "../../../shared/services/teachers.service";

@Component({
  selector: 'app-update-teachers',
  templateUrl: './update-teachers.component.html',
  styleUrls: ['./update-teachers.component.scss']
})
export class UpdateTeachersComponent implements OnInit {

  public teacher: TeacherModel;
  public teacherForm: FormGroup;
  public isSaving = false;
  public edit = false;

  constructor(public formBuilder: FormBuilder, public teachersService: TeachersService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.edit = !!this.activatedRoute.snapshot.data.teacher;
    this.teacherForm = this.formBuilder.group({
      teacherName: new FormControl('', [Validators.required]),
      teacherUrl: new FormControl(''),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.teacherForm.patchValue(this.activatedRoute.snapshot.data.teacher);
    }
  }

  public updateTeacher(): void {
    this.isSaving = true;
    this.teacher = this.teacherForm.getRawValue();
    if (this.edit) {
      this.teacher.id = this.activatedRoute.snapshot.data.teacher.id;
      this.teachersService.updateTeacher(this.teacher)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.teachersService.addTeacher(this.teacher)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.teacherForm.get(formControlName).invalid
      && (this.teacherForm.get(formControlName).dirty || this.teacherForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.teacherForm.get(formControlName).errors
      && this.teacherForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit Teacher' : 'Add Teacher';
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-teachers']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }

}
