import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WoodFrameService } from '../../../../../share/services/wood-frame/wood-frame.service';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from '../../../../../share/services/alert/alert.service';

@Component({
  selector: 'app-wood-frame',
  templateUrl: './wood-frame.component.html',
  styleUrls: ['./wood-frame.component.scss'],
})
export class WoodFrameComponent implements OnInit {
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
    thickness: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(
    private toastr: ToastrService,
    private woodFrameService: WoodFrameService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  calculate(f: FormGroupDirective) {
    const length = this.form.get('length')?.value;
    const width = this.form.get('width')?.value;
    const thickness = this.form.get('thickness')?.value;

    if (this.form.invalid) {
      this.alertService.error('Length, Width, and Thickness must be greater than 0');
      return;
    }
    this.alertService.confirmAction('Are you sure you want to calculate the wood frame volume?').then((result) => {
      if (result.isConfirmed) {
        // Proceed with calculation
        const woodFrameCalculationRequestDTO = {
          length: this.form.get('length')?.value!,
          width: this.form.get('width')?.value!,
          thickness: this.form.get('thickness')?.value!,
        };
        this.woodFrameService.calculateWoodFrame(woodFrameCalculationRequestDTO).subscribe((response) => {
          if (response?.code === 200) {
            this.volume = response?.data?.volume;
            this.loadHistory();
            // Show success alert
            this.alertService.success('Wood frame volume calculated successfully');
          }
        });
      }
    });
  }


  loadHistory() {
    this.woodFrameService.getAllPaginated(this.page, this.pageSize).subscribe((response) => {
      this.history = response?.data?.woodFrameDetails;
      this.dataCount = response?.data?.totalElements;
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    this.loadHistory();
  }
}
