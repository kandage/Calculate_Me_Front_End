import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import Swal from 'sweetalert2';
import { BrickCalculatorService } from '../../../../../share/services/brick-calculator/brick-calculator.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-brick-calculator',
  templateUrl: './brick-calculator.component.html',
  styleUrls: ['./brick-calculator.component.scss'],
})
export class BrickCalculatorComponent implements OnInit {
  numberOfBricks: any = '0';
  cementBags: any = '0';
  sandQuantity: any = '0';
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    wallLength: new FormControl('', [Validators.required, Validators.min(1)]),
    wallHeight: new FormControl('', [Validators.required, Validators.min(1)]),
    wallThickness: new FormControl('', [Validators.required, Validators.min(1)]),
    brickLength: new FormControl('', [Validators.required, Validators.min(1)]),
    brickWidth: new FormControl('', [Validators.required, Validators.min(1)]),
    brickHeight: new FormControl('', [Validators.required, Validators.min(1)]),
    cementRatio: new FormControl('', [Validators.required]),
  });

  constructor(private brickCalculatorService: BrickCalculatorService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please ensure all inputs are greater than 0 and properly filled.',
        confirmButtonText: 'OK',
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Calculation',
      text: 'Are you sure you want to calculate?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const BrickCalculationRequest = {
          wallLength: this.form.get('wallLength')?.value!,
          wallHeight: this.form.get('wallHeight')?.value!,
          wallThickness: this.form.get('wallThickness')?.value!,
          brickLength: this.form.get('brickLength')?.value!,
          brickWidth: this.form.get('brickWidth')?.value!,
          brickHeight: this.form.get('brickHeight')?.value!,
          cementRatio: this.form.get('cementRatio')?.value!,
        };

        this.brickCalculatorService.calculateBricks(BrickCalculationRequest).subscribe((response) => {
          if (response?.code === 200) {
            this.numberOfBricks = response?.data?.numberOfBricks;
            this.cementBags = response?.data?.cementBags;
            this.sandQuantity = response?.data?.sandQuantity;
            this.loadHistory();

            Swal.fire({
              icon: 'success',
              title: 'Calculation Successful',
              html: `
                <p><strong>Bricks Needed:</strong> ${this.numberOfBricks}</p>
                <p><strong>Cement Bags:</strong> ${this.cementBags}</p>
                <p><strong>Sand Quantity:</strong> ${this.sandQuantity}</p>
              `,
              confirmButtonText: 'OK',
            });
          }
        });
      }
    });
  }


  loadHistory() {
    this.brickCalculatorService.getAllPaginated(this.page, this.pageSize).subscribe((response) => {
      this.history = response?.data?.brickCalculationDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }


  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
