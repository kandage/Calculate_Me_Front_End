import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AirConditionerService } from "../../../../../share/services/air-conditioner/air-conditioner.service";
import { PageEvent } from "@angular/material/paginator";
import { AlertService } from '../../../../../share/services/alert/alert.service';

@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.scss']
})
export class AirConditionerComponent implements OnInit {
  result: any = '0 Tons';
  history: any;
  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;

  form = new FormGroup({
    length: new FormControl('', [Validators.required, Validators.min(1)]),
    breadth: new FormControl('', [Validators.required, Validators.min(1)]),
    height: new FormControl('', [Validators.required, Validators.min(1)]),
    personCount: new FormControl('', [Validators.required, Validators.min(1)]),
    maxTemperature: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private toastr: ToastrService,
    private airConditionerService: AirConditionerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      this.alertService.error('Values must be greater than zero!', 'INVALID INPUT');
      return;
    }

    this.alertService.confirmAction('Do you want to calculate the AC size?').then((result) => {
      if (result.isConfirmed) {
        const airConditionerRequestDTO = {
          length: this.form.get('length')?.value!,
          breadth: this.form.get('breadth')?.value!,
          height: this.form.get('height')?.value!,
          personCount: this.form.get('personCount')?.value!,
          maxTemp: this.form.get('maxTemperature')?.value!,
        };

        this.airConditionerService.calculateACSize(airConditionerRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            this.result = response?.data?.acSize;
            this.loadHistory();
            this.alertService.success(`AC Size: ${this.result}`, 'Calculation Successful');
          } else {
            this.toastr.error('Failed to calculate AC size. Try again.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.airConditionerService.getAllPaginated(this.page!, this.pageSize!).subscribe(response => {
      if (response?.code === 200) {
        this.history = response?.data?.airConditioners;
        this.dataCount = response?.data?.totalElements;
      } else {
        this.toastr.error('Failed to load history. Try again.', 'Error');
      }
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
