import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { StaircaseCalculatorService } from "../../../../../share/services/staircase-calculator/staircase-calculator.service";
import { PageEvent } from "@angular/material/paginator";
import {AlertService} from "../../../../../share/services/alert/alert.service";

@Component({
  selector: 'app-staircase-calculator',
  templateUrl: './staircase-calculator.component.html',
  styleUrls: ['./staircase-calculator.component.scss']
})
export class StaircaseCalculatorComponent implements OnInit {

  totalVolumeOfStairs: any = 0;
  cementBags: any = 0;
  sandInTons: any = 0
  aggregateInTons: any = 0;
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    ricer: new FormControl('', [Validators.required, Validators.min(1)]),
    tread: new FormControl('', [Validators.required, Validators.min(1)]),
    stairWidth: new FormControl('', [Validators.required, Validators.min(1)]),
    stairHeight: new FormControl('', [Validators.required, Validators.min(1)]),
    slabThickness: new FormControl('', [Validators.required, Validators.min(1)]),
    grade: new FormControl('M10', [Validators.required])
  });

  constructor(
    private toastr: ToastrService,
    private staircaseCalculatorService: StaircaseCalculatorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      this.alertService.error('Please fill all the fields with valid values greater than 0.');
      return;
    }

    this.alertService.confirmAction('Are you sure you want to calculate the staircase details?').then(result => {
      if (result.isConfirmed) {
        const stairCaseRequestDTO = {
          riser: this.form.get('ricer')?.value!,
          tread: this.form.get('tread')?.value!,
          stairWidth: this.form.get('stairWidth')?.value!,
          stairHeight: this.form.get('stairHeight')?.value!,
          slabThickness: this.form.get('slabThickness')?.value!,
          grade: this.form.get('grade')?.value!,
        };
        this.staircaseCalculatorService.calculateStairCase(stairCaseRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            this.totalVolumeOfStairs = response?.data?.numberOfBricks;
            this.cementBags = response?.data?.cementBags;
            this.sandInTons = response?.data?.sandInTons;
            this.aggregateInTons = response?.data?.sandQuantity;
            this.loadHistory();
            this.alertService.success('Calculation successful!');
          }
        });
      }
    });
  }

  loadHistory() {
    this.staircaseCalculatorService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.stairCaseDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
