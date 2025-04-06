import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BibleBooksModal } from './modals/bible.books.modal';
import kjv from '../../../../data/kjv.json';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-bible',
    standalone: false,
    templateUrl: './bible.component.html',
    styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {

    book: string = '';
    bookTitle: string = '';
    chapter: number = 1;
    bible = kjv;
    verses: any = [];

    constructor(
        private route: ActivatedRoute,
        private modalCtrl: ModalController,
        private storageSvc: StorageService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            console.log('params', params);

            this.book = params['book'];
            this.chapter = params['chapter'];

            this.setupPage();
            this.setRecents();
        });
    }

    private setupPage() {
        const book: any = this.bible.books.find((b) => {
            return b.id === this.book;
        });

        this.bookTitle = book.title;

        const chapter = book.chapters.find((c: any) => {
            return c.chapter == this.chapter;
        });

        this.verses = chapter.verses;
    }

    private async setRecents() {
        let bibleRecents = await this.storageSvc.get('bible.recents');

        if (bibleRecents === null) {
            bibleRecents = [];
        }

        bibleRecents.push({
            bookTitle: this.bookTitle,
            chapter: this.chapter
        });

        bibleRecents = bibleRecents.filter((item:any, index:Number, self:any) =>
            index === self.findIndex((obj:any) => (obj.bookTitle === item.bookTitle && obj.chapter === item.chapter))
        );

        if (bibleRecents.length > 4) {
            bibleRecents = bibleRecents.slice(-4);
        }

        bibleRecents = await this.storageSvc.set('bible.recents', bibleRecents);
    }

    async booksModal() {
        const modal = await this.modalCtrl.create({
          component: BibleBooksModal,
          breakpoints: [0, 0.90],
          initialBreakpoint: 0.90
        });

        modal.present();
    }
}
