import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/api/all-courses`);
  }

  getCoursesOnline(): Observable<Course[]> {
    return this.http.get<Course[]>('api/courses/online');
  }

  getCoursesBlended(): Observable<Course[]> {
    return this.http.get<Course[]>('api/courses/blended');
  }
}
