import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessComponent} from './process.component';
import {PlaygroundComponent} from "./components/playground/playground.component";
import {DashboardDefaultComponent} from "./components/dashboard-default/dashboard-default.component";

const routes: Routes = [{
  path: '', component: ProcessComponent, children: [
    {path: '', redirectTo: '/process/playground/dashboard', pathMatch: 'full'},
    {
      path: 'playground', component: PlaygroundComponent, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardDefaultComponent},
        {
          path: 'calculator',
          loadChildren: () => import('./modules/calculator/calculator.module').then(m => m.CalculatorModule)
        }
      ]
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProcessRoutingModule {
}
