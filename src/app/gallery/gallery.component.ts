import { Component, Input } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';

interface Book{
  title: string;
  author: string;
  location: string;
  url: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  constructor(private activateRoute: ActivatedRoute) {}
  // books: any;
  ngOnInit() {
    // this.activateRoute.data.subscribe(data => { this.books = data; console.log("this.books = ", this.books) });
  }

  books: Book[] = [
    {title: 'story Name1', author: 'author1', location: "location1", url: "../assets/books/1.png"},
    {title: 'story Name2', author: 'author2', location: "location2", url: "../assets/books/2.png"},
    {title: 'story Name3', author: 'author3', location: "location3", url: "../assets/books/3.png"},
    {title: 'story Name4', author: 'author4', location: "location4", url: "../assets/books/4.png"},
    {title: 'story Name5', author: 'author5', location: "location5", url: "../assets/books/5.png"},
    {title: 'story Name6', author: 'author6', location: "location6", url: "../assets/books/6.png"},
    {title: 'story Name7', author: 'author7', location: "location7", url: "../assets/books/7.png"},
  ];
}
