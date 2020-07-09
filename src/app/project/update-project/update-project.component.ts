import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ProjectModel} from '../../shared/models/project.model';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectStorageService} from '../../shared/services/project-storage.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  public project: ProjectModel;
  public projectForm: FormGroup;
  public isSaving = false;
  public edit = false;
  private zipRegexp: RegExp = new RegExp('([0-9]{4})-([0-9]{3})');

  constructor(public formBuilder: FormBuilder, public projectService: ProjectStorageService,
              private toastService: ToastrService, public router: Router, private location: Location,
              public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.edit = !!this.activatedRoute.snapshot.data.project;
    this.projectForm = this.formBuilder.group({
      projectName: new FormControl('', [Validators.required]),
      projectAlias: new FormControl('', [Validators.minLength(3)]),
      companyName: new FormControl('', [Validators.required]),
      companyAddress: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl('', [Validators.pattern(this.zipRegexp)]),
      personalProject: new FormControl(false),
      projectTeamMembers: this.formBuilder.array([]),
      recaptchaForm: new FormControl('', Validators.required)
    });

    if (this.edit) {
      this.projectForm.patchValue(this.activatedRoute.snapshot.data.project);
      this.createProjectTeamMemberFormArray(this.activatedRoute.snapshot.data.project)
        .forEach(g => (this.projectForm.get('projectTeamMembers') as FormArray).push(g));
    }
  }

  public updateProject(): void {
    this.isSaving = true;
    this.project = this.projectForm.getRawValue();
    if (this.edit) {
      this.project.id = this.activatedRoute.snapshot.data.project.id;
      this.projectService.updateProject(this.project)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    } else {
      this.projectService.addProject(this.project)
        .then(() => this.handleSuccess())
        .catch(() => this.handleError());
    }
  }

  public previousState(): void {
    this.location.back();
  }

  public isControlInvalid(formControlName: string): boolean {
    return this.projectForm.get(formControlName).invalid
      && (this.projectForm.get(formControlName).dirty || this.projectForm.get(formControlName).touched);
  }

  public isControlInvalidAndHasError(formControlName: string, keyError: string): boolean {
    return this.isControlInvalid(formControlName) && this.projectForm.get(formControlName).errors
      && this.projectForm.get(formControlName).hasError(keyError);
  }

  public getTitle(): string {
    return this.edit ? 'Edit project' : 'Add project';
  }

  public get projectTeamMembersControls(): Array<AbstractControl> {
    return (this.projectForm.get('projectTeamMembers') as FormArray).controls;
  }

  public addProjectTeamMember(): void {
    (this.projectForm.get(['projectTeamMembers']) as FormArray).push(this.createProjectTeamMemberFormGroup());
  }

  public deleteProjectTeamMember(index: number): void {
    (this.projectForm.get(['projectTeamMembers']) as FormArray).removeAt(index);
  }

  private createProjectTeamMemberFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      memberSpecialization: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      memberName: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('')
    });
  }

  private handleSuccess(): void {
    this.toastService.success('Successful operation');
    this.isSaving = false;
    this.router.navigate(['list-projects']);
  }

  private handleError(): void {
    this.toastService.error('Error in operation');
  }

  private createProjectTeamMemberFormArray(project: ProjectModel): FormGroup[] {
    const fg: FormGroup[] = [];
    if (!project.projectTeamMembers) {
      project.projectTeamMembers = [];
    }
    project.projectTeamMembers.forEach(projectTeamMember => {
      fg.push(this.formBuilder.group({
          id: new FormControl(projectTeamMember.id),
          memberSpecialization: new FormControl(projectTeamMember.memberSpecialization, [Validators.required, Validators.maxLength(50)]),
          memberName: new FormControl(projectTeamMember.memberName, [Validators.required, Validators.maxLength(250)]),
          startDate: new FormControl(projectTeamMember.startDate, [Validators.required]),
          endDate: new FormControl(projectTeamMember.endDate)
        })
      );
    });
    return fg;
  }
}
