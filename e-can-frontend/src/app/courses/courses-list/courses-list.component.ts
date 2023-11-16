import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/interfaces/course';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  animations: [
    trigger('expandsCards', [
      state('colapsado', style({
        opacity: 0,
        height: '0px',
        overflow: 'hidden'
      })),
      state('expandido', style({
        opacity: 1,
        height: '*',
        overflow: 'hidden'
      })),
      transition('colapsado <=> expandido', animate('300ms ease-in-out'))
    ])
  ]
})

export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  type: string | any;
  info: string = "+ Info";

  toggleDetails(selectedCourse: Course): void {
    this.courses.forEach(course => {
      if (course !== selectedCourse) {
        course.showDetails = false;
      }
    });
    selectedCourse.showDetails = !selectedCourse.showDetails;
    this.info = selectedCourse.showDetails ? "- Info" : "+ Info";
  }
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
