import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import kjv from '../../../../data/kjv.json';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-bible',
    standalone: false,
    templateUrl: './bible.component.html',
    styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {
    params: any;
    previous: any;
    next: any;
    book: any;
    bible = kjv;
    verses: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private storageSvc: StorageService
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            this.params = {
                ...params,
                chapter: parseInt(params['chapter'])
            };
            
            this.setupPage();
        });
    }

    private setupPage() {
        this.book = this.bible.books.find((b) => {
            return b.id === this.params?.bookId;
        });

        // check if book exists; else redirect to /bible-books
        if (!this.book) {
            this.router.navigate(['/bible-books']);
            return;
        }

        // check if book chapter exists; else redirect to book chapter 1
        if (isNaN(this.params.chapter) || this.params.chapter > this.book.chapters.length) {
            this.router.navigate(['/bible'], {
                queryParams: {
                    bookId: this.params.bookId, chapter: 1
                }
            });
            return;
        }

        this.setupPreviousNext();
        this.setRecents();
    }

    private setupPreviousNext() {
        this.previous = null;
        this.next = null;

        const chapter = parseInt(this.params?.chapter);

        if (chapter != 1) {
            this.previous = {
                bookId: this.params?.bookId,
                chapter: chapter - 1
            };
        }

        if (chapter < this.book?.chapters.length) {
            this.next = {
                bookId: this.params?.bookId,
                chapter: chapter + 1
            };
        }

        console.log(this.previous, this.next);
    }

    private async setRecents() {
        let bibleRecents = await this.storageSvc.get('bible.recents');

        if (bibleRecents === null) {
            bibleRecents = [];
        }

        bibleRecents.push({
            id: this.book?.id,
            title: this.book?.title,
            chapter: this.params?.chapter
        });

        bibleRecents = bibleRecents.filter((item:any, index:Number, self:any) =>
            index === self.findIndex((obj:any) => (obj.title === item.title && obj.chapter === item.chapter))
        );

        if (bibleRecents.length > 4) {
            bibleRecents = bibleRecents.slice(-4);
        }

        bibleRecents = await this.storageSvc.set('bible.recents', bibleRecents);
    }
}
