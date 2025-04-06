import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BibleBooksModal } from './components/bible/modals/bible.books.modal';

@Component({
    standalone: false,
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    async booksModal() {
        const modal = await this.modalCtrl.create({
            component: BibleBooksModal,
            breakpoints: [0, 0.90],
            initialBreakpoint: 0.90
        });

        modal.present();
    }

}
