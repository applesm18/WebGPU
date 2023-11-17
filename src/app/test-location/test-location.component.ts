import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';



interface Food {
  value: string;
  viewValue: string;
}

interface Country {
  value: string;
  viewValue: string;
}

/**
 * @title Select in a form
 */
@Component({
  selector: 'app-test-location',
  templateUrl: 'test-location.component.html',
  styleUrls: ['./test-location.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, NgFor, MatInputModule],
})
export class TestLocationComponent {
  selectedValue = 'steak-0';
  selectedLocation='disney';

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  locations: Country[] = [
    {value: 'disney', viewValue: 'Unite Stated'},
    {value: 'Richmond', viewValue: 'Canada'},
    {value: 'Asahi', viewValue: 'Japan'},
  ];
}
