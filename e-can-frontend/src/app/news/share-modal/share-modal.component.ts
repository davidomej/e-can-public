import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  share(platform: string):void {
    let url = '';
    const newsUrl = encodeURIComponent(`https://tusitio.com/news/${this.data.id}`);
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${newsUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${newsUrl}`;
        break;
    }
    window.open(url, '_blank');
  }

}
