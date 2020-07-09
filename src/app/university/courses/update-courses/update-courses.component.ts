import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {CourseModel} from '../../../shared/models/course.model';
import {CoursesService} from '../../../shared/services/courses.service';
import {Observable} from 'rxjs';
import {TeacherModel} from '../../../shared/models/teacher.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.scss']
})
export class UpdateCoursesComponent implements OnInit {

  public course: CourseModel;
  public courseForm: FormGroup;
  public isSaving = false;
  public edit = false;

  public teachers: Observable<Array<TeacherModel>> = new Observable<Array<TeacherModel>>();

  constructor(public formBuilder: FormBuilder, public courseService: CoursesService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute, public fireStoreService: AngularFirestore) {
  }

  public ngOnInit(): void {
    this.showTeachers();
    this.edit = !!this.activatedRoute.snapshot.data.course;
    this.courseForm = this.formBuilder.group({
      courseName: new FormControl('', [Validators.required]),
      courseOrg: new FormControl('', [Validators.required]),
      courseUrl: new FormControl(''),
      teachersCourse : this.formBuilder.array([]),
      subjectsCourse : this.formBuilder.array([]),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.courseForm.patchValue(this.activatedRoute.snapshot.data.course);
      this.createCourseTeachersFormArray(this.activatedRoute.snapshot.data.course)
        .forEach(g => (this.courseForm.get('teachersCourse') as FormArray).push(g));
      this.createSubjectsCourseFormArray(this.activatedRoute.snapshot.data.course)
        .forEach(g => (this.courseForm.get('subjectsCourse') as FormArray).push(g));
    }
  }

  public updateCourse(): void {
    this.courseForm.removeControl('recaptchaForm');
    this.isSaving = true;
    this.course = this.courseForm.getRawValue();
    if (this.edit) {
      this.course.id = this.activatedRoute.snapshot.data.course.id;
      this.courseService.updateCourse(this.course)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.courseService.addCourse(this.course)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.courseForm.get(formControlName).invalid
      && (this.courseForm.get(formControlName).dirty || this.courseForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.courseForm.get(formControlName).errors
      && this.courseForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit Course' : 'Add Course';
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-courses']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }

  public get courseTeachersControls(): Array<AbstractControl> {
    return (this.courseForm.get('teachersCourse') as FormArray).controls;
  }

  public get subjectsCourseControls(): Array<AbstractControl> {
    return (this.courseForm.get('subjectsCourse') as FormArray).controls;
  }

  public addTeacherCourse(): void {
    (this.courseForm.get(['teachersCourse']) as FormArray).push(this.createTeacherCourseFormGroup());
  }

  public addSubjectCourse(): void {
    (this.courseForm.get(['subjectsCourse']) as FormArray).push(this.createSubjectCourseFormGroup());
  }

  public deleteTeacherCourse(index: number): void {
    (this.courseForm.get(['teachersCourse']) as FormArray).removeAt(index);
  }

  public deleteSubjectCourse(index: number): void {
    (this.courseForm.get(['subjectsCourse']) as FormArray).removeAt(index);
  }

  private createTeacherCourseFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      teacherName : new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }

  private createSubjectCourseFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      subjectName : new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }

  private createCourseTeachersFormArray(course: CourseModel): FormGroup[] {
    const fg: FormGroup[] = [];
    if (!course.teachersCourse) {
      course.teachersCourse = [];
    }
    course.teachersCourse.forEach(teachersCourse => {
      fg.push(this.formBuilder.group({
          id: new FormControl(teachersCourse.id),
          teacherName: new FormControl(teachersCourse.teacherName)
        })
      );
    });
    return fg;
  }

  private createSubjectsCourseFormArray(course: CourseModel): FormGroup[] {
    const fg: FormGroup[] = [];
    if (!course.subjectsCourse) {
      course.subjectsCourse = [];
    }
    course.subjectsCourse.forEach(subjectsCourse => {
      fg.push(this.formBuilder.group({
          id: new FormControl(subjectsCourse.id),
          subjectName: new FormControl(subjectsCourse.subjectName)
        })
      );
    });
    return fg;
  }

  private showTeachers() {
    this.teachers = this.fireStoreService.collection<TeacherModel>('teachers').valueChanges();
  }

  public addTeacher(index: number, id: string, name: string): void {
    (this.courseForm.get(['teachersCourse']) as FormArray).at(index).setValue({
      id,
      teacherName: name,
    });
  }

  public addTeacherDyn(event, i, teacher) {
    const teacherName = (document.getElementById('teacherName-' + i) as HTMLInputElement).value;
    this.addTeacher(i, teacher.id, teacherName);
  }

  update(event, index): void {
    /*if (this.selectedTeacher.length <= index) {
      this.selectedTeacher.push(event.target.options[event.target.options.selectedIndex].text);
    }
    this.selectedTeacher[index] = event.target.options[event.target.options.selectedIndex].text;*/
    // tslint:disable-next-line:max-line-length

    (document.getElementById('teacherName-' + index) as HTMLInputElement).value =
      event.target.options[event.target.options.selectedIndex].text;


    // tslint:disable-next-line:max-line-length

    let selectorTeacher = event.target.options.selectedIndex.valueOf();
    // obtainedTeacher : <TeacherModel> = this.teachers[selectorTeacher];

    (this.courseForm.get(['teachersCourse']) as FormArray)[index].teacherName =
      new FormControl(event.target.options[event.target.options.selectedIndex].text);

    // this.addTeacher(index, obtainedTeacher)
  }

  public addToForm(id: string, name: string, index: number): void {
    (this.courseForm.get(['teachersCourse']) as FormArray).at(index).setValue({
      id: id,
      teacherName: name
    })
  }

}
