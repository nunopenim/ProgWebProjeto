import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {NavbarComponent} from './layout/navbar/navbar.component';

import {ProjectDetailsComponent} from './project/project-details/project-details.component';
import {ListProjectsComponent} from './project/list-projects/list-projects.component';
import {UpdateProjectComponent} from './project/update-project/update-project.component';
import {ProjectResolver} from './shared/resolvers/project.resolver';
import {PersonalProjectsComponent} from './project/personal-projects.component';
import {OtherProjectsComponent} from './project/other-projects.component';

import {AcademicStudiesDetailsComponent} from './education/academic-studies/academic-studies-details/academic-studies-details.component';
import {ListAcademicStudiesComponent} from './education/academic-studies/list-academic-studies/list-academic-studies.component';
import {UpdateAcademicStudiesComponent} from './education/academic-studies/update-academic-studies/update-academic-studies.component';
import {AcademicStudiesResolver} from './shared/resolvers/academic-studies.resolver';

import {CertificationsDetailsComponent} from './education/certifications/certifications-details/certifications-details.component';
import {ListCertificationsComponent} from './education/certifications/list-certifications/list-certifications.component';
import {UpdateCertificationComponent} from './education/certifications/update-certifications/update-certifications.component';
import {CertificationsResolver} from './shared/resolvers/certifications.resolver';

import {CoursesDetailsComponent} from './university/courses/courses-details/courses-details.component';
import {ListCoursesComponent} from './university/courses/list-courses/list-courses.component';
import {UpdateCoursesComponent} from './university/courses/update-courses/update-courses.component';
import {CoursesResolver} from './shared/resolvers/courses.resolver';

import {SubjectsDetailsComponent} from "./university/subjects/subjects-details/subjects-details.component";
import {ListSubjectsComponent} from "./university/subjects/list-subjects/list-subjects.component";
import {UpdateSubjectsComponent} from "./university/subjects/update-subjects/update-subjects.component";
import {SubjectsResolver} from "./shared/resolvers/subjects.resolver";

import {TeachersDetailsComponent} from "./university/teachers/teachers-details/teachers-details.component";
import {ListTeachersComponent} from "./university/teachers/list-teachers/list-teachers.component";
import {UpdateTeachersComponent} from "./university/teachers/update-teachers/update-teachers.component";
import {TeachersResolver} from "./shared/resolvers/teachers.resolver";

import {ContactsComponent} from './contacts/contacts.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: '', outlet: 'navbar', component: NavbarComponent},

  {path: 'personal-projects', component: PersonalProjectsComponent},
  {path: 'other-projects', component: OtherProjectsComponent},

  {path: 'project-details/:id', component: ProjectDetailsComponent, resolve: {project: ProjectResolver}},
  {path: 'list-projects', component: ListProjectsComponent},
  {path: 'update-project', component: UpdateProjectComponent},
  {path: 'update-project/:id', component: UpdateProjectComponent, resolve: {project: ProjectResolver}},

  {path: 'academic-studies-details/:id', component: AcademicStudiesDetailsComponent, resolve: {academic: AcademicStudiesResolver}},
  {path: 'list-academic-studies', component: ListAcademicStudiesComponent},
  {path: 'update-academic-studies', component: UpdateAcademicStudiesComponent},
  {path: 'update-academic-studies/:id', component: UpdateAcademicStudiesComponent, resolve: {academic: AcademicStudiesResolver}},

  {path: 'certifications-details/:id', component: CertificationsDetailsComponent, resolve: {certification: CertificationsResolver}},
  {path: 'list-certifications', component: ListCertificationsComponent},
  {path: 'update-certifications', component: UpdateCertificationComponent},
  {path: 'update-certifications/:id', component: UpdateCertificationComponent, resolve: {certification: CertificationsResolver}},

  {path: 'courses-details/:id', component: CoursesDetailsComponent, resolve: {course: CoursesResolver}},
  {path: 'list-courses', component: ListCoursesComponent},
  {path: 'update-courses', component: UpdateCoursesComponent},
  {path: 'update-courses/:id', component: UpdateCoursesComponent, resolve: {course: CoursesResolver}},

  {path: 'subjects-details/:id', component: SubjectsDetailsComponent, resolve: {subject: SubjectsResolver}},
  {path: 'list-subjects', component: ListSubjectsComponent},
  {path: 'update-subjects', component: UpdateSubjectsComponent},
  {path: 'update-subjects/:id', component: UpdateSubjectsComponent, resolve: {subject: SubjectsResolver}},

  {path: 'teachers-details/:id', component: TeachersDetailsComponent, resolve: {teacher: TeachersResolver}},
  {path: 'list-teachers', component: ListTeachersComponent},
  {path: 'update-teachers', component: UpdateTeachersComponent},
  {path: 'update-teachers/:id', component: UpdateTeachersComponent, resolve: {teacher: TeachersResolver}},

  {path: 'contacts', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
