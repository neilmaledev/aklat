import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bible',
    standalone: false,
    templateUrl: './bible.component.html',
    styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    books = {
        old: [
            {title: 'Genesis', chapters: Array(50).fill('').map((x,i)=>i+1)},
            {title: 'Exodus', chapters:  Array(40).fill('').map((x,i)=>i+1)}
        ],
        new: [
            {title: 'Matthew', chapters: Array(28).fill('').map((x,i)=>i+1)},
            {title: 'Mark', chapters:  Array(16).fill('').map((x,i)=>i+1)}
        ]
    };

    testament = {
        active: 'old',
        change: (testament: string) => {
            this.testament.active = testament;
        }
    };

}
