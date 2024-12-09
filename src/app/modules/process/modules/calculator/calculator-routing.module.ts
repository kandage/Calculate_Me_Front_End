import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalculatorComponent} from './calculator.component';
import {AirConditionerComponent} from "./component/air-conditioner/air-conditioner.component";
import {AntiTermiteCalculatorComponent} from "./component/anti-termite-calculator/anti-termite-calculator.component";
import {BrickCalculatorComponent} from "./component/brick-calculator/brick-calculator.component";
import {FlooringCalculatorComponent} from "./component/flooring-calculator/flooring-calculator.component";
import {SolarPanelCalculatorComponent} from "./component/solar-panel-calculator/solar-panel-calculator.component";
import {StaircaseCalculatorComponent} from "./component/staircase-calculator/staircase-calculator.component";
import {SteelQuantityComponent} from "./component/steel-quantity/steel-quantity.component";
import {WaterTankComponent} from "./component/water-tank/water-tank.component";
import {WoodFrameComponent} from "./component/wood-frame/wood-frame.component";
import {ConcreteStrengthComponent} from "./component/concrete-strength/concrete-strength.component";

const routes: Routes = [
  {
    path: '', component: CalculatorComponent, children: [
      {path: '', redirectTo: '/process/playground/calculator/air-conditioner', pathMatch: 'full'},
      {
        path: 'concrete-strength', component: ConcreteStrengthComponent
      },
      {
        path: 'air-conditioner', component: AirConditionerComponent
      },
      {
        path: 'anti-termite-calculator', component: AntiTermiteCalculatorComponent
      },
      {
        path: 'brick-calculator', component: BrickCalculatorComponent
      },
      {
        path: 'flooring-calculator', component: FlooringCalculatorComponent
      },
      {
        path: 'solar-panel-calculator', component: SolarPanelCalculatorComponent
      },
      {
        path: 'staircase-calculator', component: StaircaseCalculatorComponent
      },
      {
        path: 'steel-quantity', component: SteelQuantityComponent
      },
      {
        path: 'water-tank', component: WaterTankComponent
      },
      {
        path: 'wood-frame', component: WoodFrameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {

}
