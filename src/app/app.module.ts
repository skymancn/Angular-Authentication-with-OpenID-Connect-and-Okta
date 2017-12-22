import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from './app.component';
import {SearchComponent} from './component/search/search.component';
import {SearchService} from "./shared";
import { EditComponent } from './component/edit/edit.component';

const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
