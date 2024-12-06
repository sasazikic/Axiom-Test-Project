import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  listOfCities: any = [];
  listOfCitiesFiltered: any = [];
  cityDropdownOpened = false;
  listOfSelectedCities: any = [];
  inputValue: string = ''
  autocompleteSuggestion: string = '';

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.fetchCities().subscribe({
      next: (data: any) => {
        console.log(data)
        this.listOfCities = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openCityDropdown() {
    this.cityDropdownOpened = true;
  }

  filterCities(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;

    const inputValueToCompare = input.value.toLowerCase();
    this.listOfCitiesFiltered = this.listOfCities.filter((city: any) => city.name.toLowerCase().includes(inputValueToCompare))

    const match = this.listOfCities.find((city: any) => city.name.toLowerCase().startsWith(inputValueToCompare));
    this.autocompleteSuggestion = match ? match.name.substring(input.value.length): '';

    if (this.listOfCitiesFiltered.length === 0) {
      this.listOfCitiesFiltered = [{name: "No results found", isDisabled: true}];
    }

    if(!this.inputValue) {
      this.autocompleteSuggestion = ''
    }
  }

  onCityClick(cityName: string) {
    if (this.listOfSelectedCities.includes(cityName)) {
      return;
    }

    this.listOfSelectedCities.push(cityName);
  }

}
