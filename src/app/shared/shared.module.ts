import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { DetailComponent } from './components/detail.component';
import { ButtonComponent } from './components/button.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { MissingDataPipe } from './pipes/missing-data.pipe';

@NgModule({
  declarations: [DetailComponent, ButtonComponent, BooleanPipe, MissingDataPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule, DetailComponent, BooleanPipe, MissingDataPipe]
})
export class SharedModule { }
