import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { SolarPanelCalculatorService } from "../../../../../share/services/solar-panel-calculator/solar-panel-calculator.service";
import { PageEvent } from "@angular/material/paginator";
import { AlertService } from '../../../../../share/services/alert/alert.service';

@Component({
  selector: 'app-solar-panel-calculator',
  templateUrl: './solar-panel-calculator.component.html',
  styleUrls: ['./solar-panel-calculator.component.scss']
})
export class SolarPanelCalculatorComponent implements OnInit {

  dailyConsumption: any = '0';
  rooftopCapacity: any = '0';
  panelCount: any = '0';
  areaRequired: any = '0';
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    units: new FormControl('', [Validators.required, Validators.min(1)]),
    consumptionType: new FormControl('Monthly', [Validators.required])
  });

  constructor(
    private solarPanelCalculatorService: SolarPanelCalculatorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      this.alertService.error('Units must be greater than 0!', 'Invalid Input');
      return;
    }

    this.alertService.confirmAction('Do you want to calculate solar panel requirements?').then((result) => {
      if (result.isConfirmed) {
        const solarPanelCalculationDTO = {
          units: this.form.get('units')?.value!,
          consumptionType: this.form.get('consumptionType')?.value!
        };

        this.solarPanelCalculatorService.calculateSolarPanels(solarPanelCalculationDTO).subscribe(response => {
          if (response?.code === 200) {
            this.dailyConsumption = response?.data?.dailyConsumption;
            this.rooftopCapacity = response?.data?.rooftopCapacity;
            this.panelCount = response?.data?.panelCount;
            this.areaRequired = response?.data?.areaRequired;
            this.loadHistory();
            this.alertService.success('Calculation Successful! Solar panel details updated.');
          } else {
            this.alertService.error('Failed to calculate. Please try again.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.solarPanelCalculatorService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.solarPanelDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
