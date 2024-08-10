import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {TableComponent} from "../table/table.component";
import {AnimalDataInterface} from "../../utils/animal-data.interface";
import {ButtonComponent} from "../button/button.component";
import {AnimalsService} from "../../services/animals.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
  public readonly animalService = inject(AnimalsService);
  public readonly destroyRef = inject(DestroyRef);

  public data = signal<AnimalDataInterface[]>([]);

  readonly getAnimals = effect(() => {
    this.animalService.getAllAnimals().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (data) => this.data.set(data)
    )
  })

  editAnimal(id: number): void {
    if (id) {
    this.animalService.editAnimal(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (data) => {
        const updatedData = this.data().filter(item => item.id !== data.id);
        this.data.set(updatedData)
      }
    )
    }
  }

  deleteAnimal(id: number): void {
    console.log('id from parent', id)
    this.animalService.deleteAnimal(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const updatedData = this.data().filter(item => item.id !== id);
        this.data.set(updatedData);
      },
      error: (err) => {
        console.error('Failed to delete animal:', err);
      }
    });
  }


}
