import {Component, input} from '@angular/core';
import {AnimalDataInterface} from "../../utils/animal-data.interface";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
public animalData = input<AnimalDataInterface[]>();
}
