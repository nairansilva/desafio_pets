import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientService } from './services/http-client.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
