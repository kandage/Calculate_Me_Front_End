import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SteelQuantityService } from "../../../../../share/services/steel-quantity/steel-quantity.service";
import { PageEvent } from "@angular/material/paginator";
import {AlertService} from "../../../../../share/services/alert/alert.service";

@Component({
  selector: 'app-steel-quantity',
  templateUrl: './steel-quantity.component.html',
  styleUrls: ['./steel-quantity.component.scss']
})
export class SteelQuantityComponent implements OnInit {

  steelWeight: any = 0;
  history: any;

  page: number | undefined = 0;
  pageSize: number | undefined = 5;
  pageSizeOptions = [5, 10, 20, 30, 50];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  form = new FormGroup({
    memberType: new FormControl('', [Validators.required]),
    concreteQuantity: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(
    private toastr: ToastrService,
    private steelQuantityService: SteelQuantityService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    if (this.form.invalid) {
      this.alertService.error('Values must be greater than zero!', 'INVALID INPUT');
      return;
    }

    this.alertService.confirmAction('Do you want to proceed with the calculation?', 'Yes', 'No').then(result => {
      if (result.isConfirmed) {
        const steelQuantityRequestDTO = {
          memberType: this.form.get('memberType')?.value!,
          concreteQuantity: this.form.get('concreteQuantity')?.value!
        };

        this.steelQuantityService.calculateAndSaveSteelQuantity(steelQuantityRequestDTO).subscribe(response => {
          if (response?.code === 200) {
            this.steelWeight = response?.data?.steelWeight;
            this.alertService.success('Steel weight has been successfully calculated and saved.', 'Calculation Success');
            this.loadHistory();
          } else {
            this.alertService.error('An error occurred while calculating the steel weight.', 'Error');
          }
        });
      }
    });
  }

  loadHistory() {
    this.steelQuantityService.getAllPaginated(this.page, this.pageSize).subscribe(response => {
      this.history = response?.data?.steelQuantityDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
