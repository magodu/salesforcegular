import { Component, OnInit } from '@angular/core';
import { SalesforceService } from '../util/salesforce.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'angular-salesforce';
    author = 'Mario';
    sfResp: string;

    constructor(private sfService: SalesforceService) { }

    ngOnInit(): void {

        this.sfService.remoteAction('salesforcegularController.helloAngular', [JSON.stringify(this.author)]).subscribe(resp => {
            console.log(resp);
            this.sfResp = resp;
        });
    }
}
