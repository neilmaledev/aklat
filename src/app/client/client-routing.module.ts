import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { HomeComponent } from './components/home/home.component';
import { BibleComponent } from './components/bible/bible.component';

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
    BibleComponent
]