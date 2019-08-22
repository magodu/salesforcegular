# Salesforcegular

This repo contains a demonstration of loading an Angular 8 app inside a Visualforce page, including support for static assets, Apex controller access and router deep links.

```
Important!
Latest changes:
Now, Angular CLI by default builds the project to folder "dist/project_name".
So I added the new variable `DIST_PATH` to .env file. The default value of `DIST_PATH` is `dist`.
If you use "@angular/cli": "~1.7.3", you should define this path some like this "dist/project_name"
```



## How use it:
1. Copy gulpfile.js file to the root folder of your project
2. Copy salesforce.service.ts file to the folder services of your Angular project
3. Install dependecies: 
```sh
npm install gulp gulp-zip gulp-jsforce-deploy dotenv gulp-rename gulp-replace gulp-file  --save-dev
```
4. Create file .env in to the root folder of your project and fill it


```js
SF_USERNAME=YOUR_ORG_USERNAME
SF_PASSWORD=YOUR_PASSWORD+TOKEN   // without the +. All joined.
LOGIN_URL=https://LOGIN.salesforce.com or https://TEST.salesforce.com
PAGE_NAME=YOUR_PAGE_NAME
RESOURCE_NAME=YourStaticResources
CONTROLLER=YOUR_APEX_CONTROLLER
EXTENSIONS=YOUR_EXTENSIONS
API_VERSION=YourAPIVersion
BASE_HREF=/
DEV_RESOURCES_URL=http://localhost:4200 or other URL
DIST_PATH=dist/angular-sf
PAGE_ID=salesforcegular     // Optional
LIGHTNING_STYLESHEETS=true  // Optional
SHOWHEADER=true             // Optional
SIDEBAR=false               // Optional
```

5. Add scripts to package.json
```js
"dev": "ng build && gulp rm && gulp build-dev-package && gulp deploy && ng serve",
"prod": "ng build && gulp rm && gulp build-package && gulp deploy"
```

6. Using resources in your HTML templates

Use staticpath pipe in your assets:
```
<img style="width: 150px; height: 150px;" [src]="'assets/images/catmin.gif' | staticpath" />
```

7. Using RemoteActions
Component:
```js
import { Component } from '@angular/core';
import { SalesforceService } from './services/salesforce.service';
@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.scss']
})
export class HomeComponent{
 constructor(
   private sfService: SalesforceService
 ) {
  this.sfService.callRemote('SomeController.RemouteActionMethod',
      [JSON.stringify(param_1),JSON.stringify(param_N)], this.successCallback, this.failedCallback);
  }
  private successCallback = (response) => console.log(response)
  private failedCallback = (response) => console.log(response)
}
```
8. Use command `npm run dev` to dev mode. 
Your project will deploy to Salesforce ORG and will take resources from your local dev server.
9. Use command `npm run prod`. 
This command creates the package with page and resources next it will deploy on Salesforce.


## Salesforce Org Set up ##

Inside your Salesforce org add an Apex class named sftestcontroller:


    public class sftestcontroller {
    
       @RemoteAction
       public static string helloAngular(string name) {
           return 'User ' + UserInfo.getUserId() + ' says hello ' + name;
       }
    }


## Credits

Project based in articles from Alexandr Havrilov, Andres Rutnik and Danilo Cardoso. Thank you guys.