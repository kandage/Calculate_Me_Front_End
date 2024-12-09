import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ConcreteStrengthCalculationService } from "../../../../../share/services/concrete-strength/concrete-strength-calculation.service";
import { AlertService } from "../../../../../share/services/alert/alert.service";

@Component({
  selector: 'app-concrete-strength',
  templateUrl: './concrete-strength.component.html',
  styleUrls: ['./concrete-strength.component.scss']
})
export class ConcreteStrengthComponent implements OnInit {
  totalVolumeOfConcrete: any = 0;
  cementBags: any = 0;
  sandInTons: any = 0;
  aggregateInTons: any = 0;
  history: any = [];

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: any;

  form = new FormGroup({
    cement: new FormControl('', [Validators.required, Validators.min(1)]),
    ash: new FormControl('', [Validators.required, Validators.min(1)]),
    slag: new FormControl('', [Validators.required, Validators.min(1)]),
    water: new FormControl('', [Validators.required, Validators.min(1)]),
    superplasticizer: new FormControl('', [Validators.required, Validators.min(1)]),
    coarseAggregate: new FormControl('', [Validators.required, Validators.min(1)]),
    fineAggregate: new FormControl('', [Validators.required, Validators.min(1)]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private concreteStrengthCalculationService: ConcreteStrengthCalculationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadSavedData();
  }

  loadSavedData() {
    this.concreteStrengthCalculationService.getAllPaginated().subscribe(
      (response: any) => {
        this.history = response.data;
        this.dataCount = this.history.length;
      },
      error => {
        this.alertService.error('Error loading history data');
      }
    );
  }


  calculate(formDirective: FormGroupDirective) {
    if (!this.form.valid) {
      this.alertService.error('Inputs must be greater than zero!', 'Invalid Input');
      return;
    }

    this.alertService
      .confirmAction('Are you sure you want to perform the calculation?')
      .then((result) => {
        if (result.isConfirmed) {
          const calculationData = {
            cement: this.form.value.cement,
            ash: this.form.value.ash,
            slag: this.form.value.slag,
            water: this.form.value.water,
            superplasticizer: this.form.value.superplasticizer,
            coarseAggregate: this.form.value.coarseAggregate,
            fineAggregate: this.form.value.fineAggregate,
            age: this.form.value.age,
          };

          this.concreteStrengthCalculationService.calculateConcreteStrength(calculationData).subscribe(
            (response: any) => {
              if (response.output) {
                this.totalVolumeOfConcrete = parseFloat(response.output);
                this.alertService.success('Calculation successful!');
                formDirective.resetForm();
              } else {
                this.alertService.error('Calculation failed! No result found.');
              }
            },
            error => {
              this.alertService.error('An error occurred while calculating.');
            }
          );
        }
      });
  }
}
