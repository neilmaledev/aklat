import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { BibleComponent } from './components/bible/bible.component';
import { BibleBooksModal } from './components/bible/modals/bible.books.modal';
import { BibleBooksComponent } from './components/bible-books/bible-books.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {
                path: '', 
                component: HomeComponent
            },
            {
                path: 'bible', 
                component: BibleComponent
            },
            {
                path: 'bible-books', 
                component: BibleBooksComponent
            }
        ]
    },
    {
        path: '**', 
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

export const ClientArrayOfComponents = [
    ClientComponent,
    HomeComponent,
    BibleComponent,
    BibleBooksModal,
    BibleBooksComponent
]