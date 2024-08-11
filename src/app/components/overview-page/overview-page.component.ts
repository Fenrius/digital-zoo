import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {TableComponent} from "../table/table.component";
import {AnimalDataInterface} from "../../utils/animal-data.interface";
import {ButtonComponent} from "../button/button.component";
import {AnimalsService} from "../../services/animals.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [
    TableComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.css'
})
export class OverviewPageComponent {
  public readonly animalService = inject(AnimalsService);
  public readonly destroyRef = inject(DestroyRef);

  public data = signal<AnimalDataInterface[]>([]);

  isAddFormOpen = false;

  readonly getAnimals = effect(() => {
    this.animalService.getAllAnimals().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (data) => this.data.set(data)
    )
  })

  animalForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    weight: new FormControl<number | null>(null, [Validators.required]),
    power: new FormControl<string>('', [Validators.required]),
    extinction: new FormControl<string>('', [Validators.required])
  });

  addAnimal() {
    const animalData: Omit<AnimalDataInterface, 'id'> = {
      name: this.animalForm.value.name as string,
      weight: this.animalForm.value.weight as number,
      power: this.animalForm.value.power as string,
      extinction: this.animalForm.value.extinction as string,
    }

    this.animalService.addAnimal(animalData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (createdAnimal) => {
        this.data.set([...this.data(), createdAnimal]);
      },
      error: (err) => {
        console.error('Failed to add animal:', err);
      }
    });

    this.animalForm.reset();
    this.isAddFormOpen = false;
  }

  editAnimal(updatedAnimal: AnimalDataInterface): void {
    this.animalService.editAnimal(updatedAnimal).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        const updatedData = this.data().map(animal => animal.id === updatedAnimal.id ? updatedAnimal : animal);
        this.data.set(updatedData);
      },
      error: (err) => {
        console.error('Failed to update animal:', err);
      }
    });
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
