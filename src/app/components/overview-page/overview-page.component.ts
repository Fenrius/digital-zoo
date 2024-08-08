import {Component, signal} from '@angular/core';
import {TableComponent} from "../table/table.component";
import {AnimalDataInterface} from "../../utils/animal-data.interface";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [
    TableComponent,
    ButtonComponent
  ],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {
  public animalData = signal<AnimalDataInterface[]>(
    [
    {name: 'Moonpie', weight: 2, power: 'Djukkedi pa', extinct: '2020'},
    {name: 'Dodo', weight: 4.5, power: 'sitzen', extinct: 'langer Zeit'}
  ]);
}
