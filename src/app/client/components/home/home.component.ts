import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    bibleRecents:any = [];

    constructor(private storageSvc: StorageService) {

    }

    async ngOnInit() {
        // this.storageSvc.clear(); // for testing purposes
        this.setBibleRecents();
    }

    private async setBibleRecents() {
        this.bibleRecents = await this.storageSvc.get('bible.recents') || [];
        
        for (let b of this.bibleRecents) {
            let trimmedBookTitle = b.bookTitle.trim().replace(/\s+/g, "");
            b.shortBookTitle = trimmedBookTitle.slice(0, 3).toUpperCase();
        }

        console.log('4444', this.bibleRecents);
    }

}
