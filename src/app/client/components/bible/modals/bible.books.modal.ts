import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import kjv from '../../../../../data/kjv.json';

@Component({
    selector: 'bible-books-modal',
    standalone: false,
    templateUrl: 'bible.books.modal.html',
    styleUrls: ['./bible.books.modal.scss']
})
export class BibleBooksModal {

    constructor(private modalCtrl: ModalController) { }

    bible = kjv;

    testament = {
        active: 'old',
        change: (testament: string) => {
            this.testament.active = testament;
        }
    };

    arrayFilter = {
        oldTestament: function (book: any) {
            return book.testament === 'old';
        },
        newTestament: function (book: any) {
            return book.testament === 'new';
        }
    };

    cancel() {
        return this.modalCtrl.dismiss('cancel');
    }

    confirm() {
        return this.modalCtrl.dismiss('confirm');
    }

}