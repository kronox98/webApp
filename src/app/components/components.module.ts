import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { JumbotronComponent } from './jumbotron/jumbotron.component';



@NgModule({
  declarations: [HeaderComponent, JumbotronComponent],
  exports: [HeaderComponent, JumbotronComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
