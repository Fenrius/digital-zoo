import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnimalDataInterface} from "../utils/animal-data.interface";

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  baseUrl = 'http://localhost:8000/animals/';

  readonly httpClient = inject(HttpClient);

  getAllAnimals() {
    return this.httpClient.get<AnimalDataInterface[]>(`${this.baseUrl}`)
  }

  editAnimal(id: number) {
    return this.httpClient.put<AnimalDataInterface>(`${this.baseUrl}${id}/`, this.getAllAnimals())
  }

  deleteAnimal(id: number) {
    return this.httpClient.delete<AnimalDataInterface>(`${this.baseUrl}${id}/`)
  }
}
