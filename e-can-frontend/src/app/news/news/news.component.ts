import { Component } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { NewsService } from 'src/app/services/news.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  likesCount = 0;
  newsList: News[] = [];

  constructor(private newsService: NewsService,
              public dialog: MatDialog) {}

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

    share(newsItem: News): void{
      const dialogRef = this.dialog.open(ShareModalComponent, {
        width: '250px',
        data: newsItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
