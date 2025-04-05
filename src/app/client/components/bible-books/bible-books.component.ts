import { Component, OnInit } from '@angular/core';
import kjv from '../../../../data/kjv.json';

@Component({
    selector: 'app-bible-books',
    standalone: false,
    templateUrl: './bible-books.component.html',
    styleUrls: ['./bible-books.component.scss']
})
export class BibleBooksComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    bible = kjv;

    arrayFilter = {
        oldTestament: function (book: any) {
            return book.testament === 'old';
        },
        newTestament: function (book: any) {
            return book.testament === 'new';
        }
    };

    testament = {
        active: 'old',
        change: (testament: string) => {
            this.testament.active = testament;
        }
    };
}
