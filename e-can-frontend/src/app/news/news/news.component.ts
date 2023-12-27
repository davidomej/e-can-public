import { Component } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  likesCount = 0;
  newsList: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.newsService.getNews().subscribe((news) => {
      this.newsList = news;
    });
  }

  incrementLikes(newsItem: News) {
      if (!newsItem.hasLiked) {
          newsItem.likesCount++;
          newsItem.hasLiked = true;
          if(newsItem.id){
            this.newsService.updatelikes(newsItem.id, newsItem.likesCount).subscribe();
          }
      }
    }

    share() {
      
    }
}
