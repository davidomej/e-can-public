import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  { path: 'select', component: SelectComponent },
];


@NgModule({
  declarations: [
    SelectComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule  ],
  exports: [
    RouterModule
  ]
})
export class CoursesModule { }
