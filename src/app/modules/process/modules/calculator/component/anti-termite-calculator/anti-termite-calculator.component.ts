import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AntiTermiteService } from "../../../../../share/services/anti-termite/anti-termite.service";
import { PageEvent } from "@angular/material/paginator";
import { AlertService } from '../../../../../share/services/alert/alert.service';

@Component({
  selector: 'app-anti-termite-calculator',
  templateUrl: './anti-termite-calculator.component.html',
  styleUrls: ['./anti-termite-calculator.component.scss']
})
export class AntiTermiteCalculatorComponent implements OnInit {

  result: any = '0';
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;

  form = new FormGroup({
    length: new FormControl('', [Validators.required, Validators.min(1)]),
    width: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    private toastr: ToastrService,
    private antiTermiteService: AntiTermiteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      this.alertService.error('Inputs must be greater than zero!', 'Invalid Input');
      return;
    }

    this.alertService.confirmAction('Do you want to calculate Anti Termite QTY ?').then((result) => {
      if (result.isConfirmed) {
        const antiTermiteRequestDTO = {
          length: this.form.get('length')?.value!,
          width: this.form.get('width')?.value!
        };

        this.antiTermiteService.calculateAndSaveAntiTermite(antiTermiteRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            this.result = response?.data?.quantity;
            this.loadHistory();
            this.alertService.success(`Calculation Successful! Quantity: ${this.result}`);
          } else {
            this.toastr.error('Failed to calculate. Please try again.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.antiTermiteService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.antiTermiteDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
