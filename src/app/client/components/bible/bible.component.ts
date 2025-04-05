import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BibleBooksModal } from './modals/bible.books.modal';
import kjv from '../../../../data/kjv.json';

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
        // private router: Router,
        private modalCtrl: ModalController
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            console.log('params', params);

            this.book = params['book'];
            this.chapter = params['chapter'];

            this.setupPage();
        });

        
    }

    setupPage() {
        const book: any = this.bible.books.find((b) => {
            return b.id === this.book;
        });

        // console.log(this.chapter, book.chapters)
        this.bookTitle = book.title;
        this.verses = book.chapters[(this.chapter - 1)].verses;
    }

    async booksModal() {
        const modal = await this.modalCtrl.create({
          component: BibleBooksModal
        });

        modal.present();
    
        // const { data, role } = await modal.onWillDismiss();
    
        // if (role === 'confirm') {
        //   this.message = `Hello, ${data}!`;
        // }
      }
}
