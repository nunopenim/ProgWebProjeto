import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {NgbButtonsModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MainComponent} from './layout/main/main.component';
import {FooterComponent} from './layout/footer/footer.component';

import {ProjectDetailsComponent} from './project/project-details/project-details.component';
import {ListProjectsComponent} from './project/list-projects/list-projects.component';
import {UpdateProjectComponent} from './project/update-project/update-project.component';
import {PersonalProjectsComponent} from './project/personal-projects.component';
import {OtherProjectsComponent} from './project/other-projects.component';
import {DeleteProjectModalComponent} from './project/delete-project-modal.component';

import {AcademicStudiesDetailsComponent} from './education/academic-studies/academic-studies-details/academic-studies-details.component';
import {ListAcademicStudiesComponent} from './education/academic-studies/list-academic-studies/list-academic-studies.component';
import {UpdateAcademicStudiesComponent} from './education/academic-studies/update-academic-studies/update-academic-studies.component';
import {DeleteAcademicStudiesModalComponent} from './education/academic-studies/delete-academic-studies-modal.component';

import {CertificationsDetailsComponent} from './education/certifications/certifications-details/certifications-details.component';
import {ListCertificationsComponent} from './education/certifications/list-certifications/list-certifications.component';
import {UpdateCertificationComponent} from './education/certifications/update-certifications/update-certifications.component';
import {DeleteCertificationModalComponent} from './education/certifications/delete-certification-modal.component';

import {CoursesDetailsComponent} from './university/courses/courses-details/courses-details.component';
import {ListCoursesComponent} from './university/courses/list-courses/list-courses.component';
import {UpdateCoursesComponent} from './university/courses/update-courses/update-courses.component';
import {DeleteCoursesModalComponent} from './university/courses/delete-courses-modal.component';

import {SubjectsDetailsComponent} from './university/subjects/subjects-details/subjects-details.component';
import {ListSubjectsComponent} from './university/subjects/list-subjects/list-subjects.component';
import {UpdateSubjectsComponent} from './university/subjects/update-subjects/update-subjects.component';
import {DeleteSubjectsModalComponent} from './university/subjects/delete-subjects-modal.component';

import { TeachersDetailsComponent } from './university/teachers/teachers-details/teachers-details.component';
import { ListTeachersComponent } from './university/teachers/list-teachers/list-teachers.component';
import { UpdateTeachersComponent } from './university/teachers/update-teachers/update-teachers.component';
import { DeleteTeacherModalComponent } from './university/teachers/delete-teacher-modal.component';

import {ContactsComponent} from './contacts/contacts.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBzcbE6INGf3DiDuzjG48OGxuyWdNHHlfM',
  authDomain: 'pweb-final-21700874-21803482.firebaseapp.com',
  databaseURL: 'https://pweb-final-21700874-21803482.firebaseio.com',
  projectId: 'pweb-final-21700874-21803482',
  storageBucket: 'pweb-final-21700874-21803482.appspot.com',
  messagingSenderId: '839609154904',
  appId: '1:839609154904:web:382f680157608b1260792d'
};

// Measurement ID

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,

    ProjectDetailsComponent,
    ListProjectsComponent,
    UpdateProjectComponent,
    PersonalProjectsComponent,
    OtherProjectsComponent,
    DeleteProjectModalComponent,

    AcademicStudiesDetailsComponent,
    ListAcademicStudiesComponent,
    UpdateAcademicStudiesComponent,
    DeleteAcademicStudiesModalComponent,

    CertificationsDetailsComponent,
    ListCertificationsComponent,
    UpdateCertificationComponent,
    DeleteCertificationModalComponent,

    CoursesDetailsComponent,
    ListCoursesComponent,
    UpdateCoursesComponent,
    DeleteCoursesModalComponent,

    SubjectsDetailsComponent,
    ListSubjectsComponent,
    UpdateSubjectsComponent,
    DeleteSubjectsModalComponent,

    TeachersDetailsComponent,
    ListTeachersComponent,
    UpdateTeachersComponent,
    DeleteTeacherModalComponent,

    ContactsComponent
  ],

    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        NgbButtonsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RecaptchaModule,
        RecaptchaFormsModule,
        SharedModule,
        FormsModule
    ],

  providers: [
    {provide: RECAPTCHA_SETTINGS, useValue: {siteKey: '6LdGUK0ZAAAAACb-44xYkQS52dy6cLP_Fjmkdt49'} as RecaptchaSettings}
  ],

entryComponents: [DeleteProjectModalComponent, DeleteAcademicStudiesModalComponent,
DeleteCertificationModalComponent, DeleteCoursesModalComponent, DeleteSubjectsModalComponent, DeleteTeacherModalComponent],
bootstrap: [AppComponent]
})
export class AppModule {
}
