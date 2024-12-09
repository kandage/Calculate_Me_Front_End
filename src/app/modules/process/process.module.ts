import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { DashboardBodyComponent } from './components/dashboard-body/dashboard-body.component';
import { DashboardDefaultComponent } from './components/dashboard-default/dashboard-default.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    ProcessComponent,
    PlaygroundComponent,
    DashboardBodyComponent,
    DashboardDefaultComponent
  ],
    imports: [
        CommonModule,
        ProcessRoutingModule,
        MatIconModule,
      MatTooltipModule
    ]
})
export class ProcessModule { }
