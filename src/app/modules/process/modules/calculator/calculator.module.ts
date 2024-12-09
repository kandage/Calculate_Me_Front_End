import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';
import { AirConditionerComponent } from './component/air-conditioner/air-conditioner.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { AntiTermiteCalculatorComponent } from './component/anti-termite-calculator/anti-termite-calculator.component';
import { BrickCalculatorComponent } from './component/brick-calculator/brick-calculator.component';
import {MatSelectModule} from "@angular/material/select";
import { FlooringCalculatorComponent } from './component/flooring-calculator/flooring-calculator.component';
import { SolarPanelCalculatorComponent } from './component/solar-panel-calculator/solar-panel-calculator.component';
import {StaircaseCalculatorComponent} from "./component/staircase-calculator/staircase-calculator.component";
import { SteelQuantityComponent } from './component/steel-quantity/steel-quantity.component';
import { WaterTankComponent } from './component/water-tank/water-tank.component';
import { WoodFrameComponent } from './component/wood-frame/wood-frame.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ConcreteStrengthComponent } from './component/concrete-strength/concrete-strength.component';


@NgModule({
  declarations: [
    CalculatorComponent,
    AirConditionerComponent,
    AntiTermiteCalculatorComponent,
    BrickCalculatorComponent,
    FlooringCalculatorComponent,
    SolarPanelCalculatorComponent,
    StaircaseCalculatorComponent,
    SteelQuantityComponent,
    WaterTankComponent,
    WoodFrameComponent,
    ConcreteStrengthComponent
  ],
    imports: [
        CommonModule,
        CalculatorRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatPaginatorModule
    ]
})
export class CalculatorModule { }
