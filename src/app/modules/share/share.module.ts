import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShareRoutingModule} from './share-routing.module';
import {ShareComponent} from './share.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MainLoadingComponent} from "./components/main-loading/main-loading.component";


@NgModule({
  declarations: [
    ShareComponent,
    MainLoadingComponent
  ],
  exports: [
    MainLoadingComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    MatSnackBarModule
  ]
})
export class ShareModule {
}
