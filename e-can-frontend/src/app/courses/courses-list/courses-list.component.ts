import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/interfaces/course';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  type: string | any;

  constructor(private coursesServices: CoursesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.loadCourses(this.type);
    });
  }

  loadCourses(type: string): void {
    this.coursesServices.getAllCourses().subscribe(data => {
      this.courses = data;
    });

    // if (type === 'online') {
    //   this.coursesServices.getCoursesOnline().subscribe(data => {
    //     this.courses = data;
    //   });
    // } else if (type === 'blended') {
    //   this.coursesServices.getCoursesBlended().subscribe(data => {
    //     this.courses = data;
    //   });
    // }
  }
}
