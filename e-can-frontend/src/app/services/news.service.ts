import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.apiUrl}/api/news`);
  }

  updatelikes(newsId: String, likesCount: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/news/${newsId}/likes`, { likesCount: likesCount });
  }
}
