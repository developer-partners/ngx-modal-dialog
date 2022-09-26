import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'projects/ngx-modal-dialog/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ModalDemoComponent, ModalLongContentComponent, ModalResultDemoComponent, ModalWithParameterComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDemoComponent,
    ModalResultDemoComponent,
    ModalLongContentComponent,
    ModalWithParameterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
