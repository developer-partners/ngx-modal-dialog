import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
