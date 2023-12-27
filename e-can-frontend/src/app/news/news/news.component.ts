import { Component } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { NewsService } from 'src/app/services/news.service';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  likesCount = 0;
  newsList: News[] = [];

  constructor(private newsService: NewsService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((news) => {
      this.newsList = news;
      this.route.fragment.subscribe((fragment) => {
        if(fragment){
          setTimeout(() => {
            const element = document.querySelector(`#${fragment}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      });
    });
  }

  incrementLikes(newsItem: News) {
    if (!newsItem.hasLiked) {
      newsItem.likesCount++;
      newsItem.hasLiked = true;
      if (newsItem.id) {
        this.newsService.updatelikes(newsItem.id, newsItem.likesCount).subscribe();
      }
    }
  }

  share(newsItem: News): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      width: '300px',
      data: newsItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
