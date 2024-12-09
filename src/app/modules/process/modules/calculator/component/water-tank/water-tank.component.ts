import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { WaterTankService } from "../../../../../share/services/water-tank/water-tank.service";
import { PageEvent } from "@angular/material/paginator";
import { AlertService } from "../../../../../share/services/alert/alert.service";

@Component({
  selector: 'app-water-tank',
  templateUrl: './water-tank.component.html',
  styleUrls: ['./water-tank.component.scss']
})
export class WaterTankComponent implements OnInit {

  capacity: any = '0';
  volume: any = '0';
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    length: new FormControl('', [Validators.required, Validators.min(1)]),
    width: new FormControl('', [Validators.required, Validators.min(1)]),
    depth: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    private toastr: ToastrService,
    private waterTankService: WaterTankService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    // Check if the form is valid
    if (this.form.invalid) {
      this.alertService.error('Length, Width, and Depth must be greater than 0!', 'Invalid Input');
      return;
    }

    // Show a confirmation alert before proceeding with the calculation
    this.alertService.confirmAction('Do you want to proceed with the calculation?', 'Yes', 'No').then(result => {
      if (result.isConfirmed) {
        // Proceed with the calculation
        const waterTankCalculationRequestDTO = {
          length: this.form.get('length')?.value!,
          width: this.form.get('width')?.value!,
          depth: this.form.get('depth')?.value!
        };

        this.waterTankService.calculateWaterTank(waterTankCalculationRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            // On success, update the capacity and volume
            this.capacity = response?.data?.capacity;
            this.volume = response?.data?.volume;

            // Show success alert
            this.alertService.success('Water tank calculation successful!', 'Success');
            this.loadHistory();
          } else {
            // Show error alert if something went wrong
            this.alertService.error('An error occurred while calculating the water tank.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.waterTankService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.waterTankDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
