import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '', component: NewsComponent },
];


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule]
})
export class NewsModule { }
