import { ColegioModule } from './views/colegio/colegio.module';
import { ServicesModule } from './app_core/services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarnavComponent } from './containers/sidebarnav/sidebarnav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';



const APP_CONTAINERS = [
  SidebarnavComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    APP_CONTAINERS,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    ColegioModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
