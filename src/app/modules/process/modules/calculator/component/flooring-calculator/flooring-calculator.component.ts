import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { FlooringCalculatorService } from "../../../../../share/services/flooring-calculator/flooring-calculator.service";
import { PageEvent } from "@angular/material/paginator";
import { AlertService } from '../../../../../share/services/alert/alert.service';

@Component({
  selector: 'app-flooring-calculator',
  templateUrl: './flooring-calculator.component.html',
  styleUrls: ['./flooring-calculator.component.scss']
})
export class FlooringCalculatorComponent implements OnInit {

  numberOfTiles: any = '0';
  cementBags: any = '0';
  sandQuantity: any = '0';
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    floorLength: new FormControl('', [Validators.required, Validators.min(1)]),
    floorWidth: new FormControl('', [Validators.required, Validators.min(1)]),
    tileLength: new FormControl('', [Validators.required, Validators.min(1)]),
    tileWidth: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private flooringCalculatorService: FlooringCalculatorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    // Validate inputs
    if (this.form.invalid) {
      this.alertService.error('All inputs must be greater than 0!', 'Invalid Input');
      return;
    }

    // Confirm action
    this.alertService.confirmAction('Do you want to calculate the flooring requirements?').then((result) => {
      if (result.isConfirmed) {
        const flooringRequestDTO = {
          floorLength: this.form.get('floorLength')?.value!,
          floorWidth: this.form.get('floorWidth')?.value!,
          tileLength: this.form.get('tileLength')?.value!,
          tileWidth: this.form.get('tileWidth')?.value!,
        };

        // Perform calculation
        this.flooringCalculatorService.calculateFlooring(flooringRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            this.numberOfTiles = response?.data?.numberOfTiles;
            this.cementBags = response?.data?.cementBags;
            this.sandQuantity = response?.data?.sandQuantity;
            this.loadHistory();
            this.alertService.success('Calculation Successful! Flooring details updated.');
          } else {
            this.alertService.error('Failed to calculate flooring requirements. Please try again.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.flooringCalculatorService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.flooringDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
