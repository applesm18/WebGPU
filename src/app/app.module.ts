import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestLocationModule } from './test-location/test-location.module';
import { bookModule } from './book/book.module';

import { PlaybookComponent } from './playbook/playbook.component';

import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';

let Books = [
  {title: 'story Name1', author: 'author1', location: "location1", url: "../assets/books/1.png"},
  {title: 'story Name2', author: 'author2', location: "location2", url: "../assets/books/2.png"},
  {title: 'story Name3', author: 'author3', location: "location3", url: "../assets/books/3.png"},
  {title: 'story Name4', author: 'author4', location: "location4", url: "../assets/books/4.png"},
  {title: 'story Name5', author: 'author5', location: "location5", url: "../assets/books/5.png"},
  {title: 'story Name6', author: 'author6', location: "location6", url: "../assets/books/6.png"},
  {title: 'story Name7', author: 'author7', location: "location7", url: "../assets/books/7.png"},
];

const appRoutes: Routes = [
  { path: 'playbook', component: PlaybookComponent },
  { path: '', component: GalleryComponent, data: {books: Books} }
];


@NgModule({
  declarations: [
    AppComponent,
    PlaybookComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TestLocationModule,
    bookModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
