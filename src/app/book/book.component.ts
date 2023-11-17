import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  standalone: true,
  styles: [
  ]
})
export class BookComponent{
  constructor(
    private router: Router
  ) { }

  gotoPlayBook(){
      setTimeout(() => {
          console.log("gotoplaybook =>");
          this.router.navigate(['/playbook']);
          this.showFilters = true;
      }, 100);
  }

  @Input() book = {title: '', author: '', location: '', url: ''};
  @Input() showFilters = false;
}
