import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { StaticPathPipe } from './pipes/static-path.pipe';

import { SalesforceService } from './util/salesforce.service';
import { SalesforceHashLocationStrategy } from './util/sf-path-location-strategy';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
		HomeComponent,
		StaticPathPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: SalesforceHashLocationStrategy },
		SalesforceService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
