# AngularPactExample
This is an example of a consumer driven PACT test for an Angular 2+ client based on [Pact JS repo]: https://github.com/pact-foundation/pact-js  
Install the following PACT dependencies:  
- npm install pact --save-dev
- npm install pact-web --save-dev
- npm install karma-pact --save-dev

The following changes were made to the karma.conf.js file:  
        module.exports = function (config) {  
          config.set({  
           basePath: '',  
       -      frameworks: ['jasmine', '@angular/cli'],  
       +      frameworks: ['jasmine', '@angular/cli', 'pact'],  
       +      pact: {cors: true},  
            plugins: [  
               require('karma-jasmine'),  
       +       require('karma-pact'),  
             require('karma-chrome-launcher'),  
             require('karma-phantomjs-launcher'),  
             require('karma-jasmine-html-reporter'),  
       ...  
       port: 9876,  
       +      proxies: {'/hello-service/api':'http://localhost:1234/hello-service/api'},  
       colors: true,  

Notice that karma-pact will create a mock-server running at port 1234 (by default) and this cannot be the same port as
karma is using (9876). This is why we need to define proxies to redirect requests from our pact tests to the mock-server.  
'ng test' will run all unit tests including the pact test: hello-service.pact.spec.ts.  
The pact file will be generated in folder pacts by default (you can configure this in pact property in the karma.conf.js).  
For more info refer to [Pact JS repo]: https://github.com/pact-foundation/pact-js.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
