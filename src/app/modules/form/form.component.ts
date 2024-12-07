import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { formModel } from '../../models/form-model';
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
  submitOverlayOpened = false;

  form = new FormGroup({
    cities: new FormArray<FormControl<string>>([], Validators.required),
    metricPreferences: new FormArray<FormControl<string>>([], Validators.required),
    layoutOption: new FormControl('', Validators.required),
    chartOption: new FormControl('', Validators.required)
  })

  constructor(private formService: FormService, private router: Router) {}



  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    const clickedElement = event.target as HTMLElement

    if (!clickedElement.classList.contains('select-option') && !clickedElement.closest('.select-option')
    && !clickedElement.closest('.input-wrap')) {
      this.cityDropdownOpened = false;
    }
  }

  ngOnInit(): void {
    this.formService.fetchCities().subscribe({
      next: (data: any) => {

        this.listOfCities = data
      },
      error: (error) => {
        console.log(error)
      }
    })

    if(this.formService.prepopulatedFormData) {
      this.customPatchingValue();
    }
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
    const cities = this.form.get('cities') as FormArray;

    if (this.listOfSelectedCities.includes(cityName)) {
      return;
    }

    cities.push(new FormControl(cityName));
    this.listOfSelectedCities.push(cityName);

  }

  addCity(city: string) {
    const cities = this.form.get('cities') as FormArray;
    if (!cities.value.includes(city)) {
      cities.push(new FormControl(city));
    }
  }

  onMetricCheckboxChange(event: Event) {
    const clickedCheckbox = event.target as HTMLInputElement;
    const clickedCheckboxId = clickedCheckbox.getAttribute('id');
    const metricPreferences = this.form.get('metricPreferences') as FormArray

    // Execute when select
    if(clickedCheckbox.checked) {
      if (!metricPreferences.value.includes(clickedCheckboxId)) {
        metricPreferences.push(new FormControl(clickedCheckboxId));
      }
    } else { // execute when deselect
      const index = metricPreferences.value.indexOf(clickedCheckboxId);
      if (index > -1) {
        metricPreferences.removeAt(index);
      }
    }
  }

  onRadioButtonClick(event: Event) {
    console.log(event)
  }

  openSubmitPopup() {
    console.log(this.form.value)
    this.submitOverlayOpened = true;
  }

  closePopup() {
    this.submitOverlayOpened = false;
  }

  onSubmit() {
    this.formService.prepopulatedFormData = {
      cities: this.form.value.cities || [],
      metricPreference: this.form.value.metricPreferences || [],
      layoutOption: this.form.value.layoutOption || '',
      chartOption: this.form.value.chartOption || '',
    };

    this.router.navigate(['dashboard']);
  }


  customPatchingValue() {

    this.listOfSelectedCities = this.formService.prepopulatedFormData.cities
    const citiesArray = this.form.get('cities') as FormArray;
    citiesArray.clear();
    this.formService.prepopulatedFormData.cities.forEach((city) => citiesArray.push(new FormControl(city)));

    const metricPreferencesArray = this.form.get('metricPreferences') as FormArray;
    metricPreferencesArray.clear();
    this.formService.prepopulatedFormData.metricPreference.forEach((metric) => metricPreferencesArray.push(new FormControl(metric)));

    this.form.patchValue({
      layoutOption: this.formService.prepopulatedFormData.layoutOption,
      chartOption: this.formService.prepopulatedFormData.chartOption
    });
  }

  onSelectedCityClick(city: string){
    this.listOfSelectedCities.splice(this.listOfSelectedCities.indexOf(city), 1);

    const citiesArray = this.form.get('cities') as FormArray;
    const index = citiesArray.value.indexOf(city);
    if (index !== -1) {
      citiesArray.removeAt(index);
    }
  }

}

