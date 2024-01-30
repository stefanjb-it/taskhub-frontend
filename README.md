# TaskhubFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2 but upgraded to 17.0.8 for necessary functionality.

## Setup

NodeJS and npm are required to run this project. To install NodeJS and npm, follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Once the project was downloaded, run `npm install` to install all the dependencies. (mostly Angular first-party packages).
Afterwards, the project can be started as documented below.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
The backend must be run in parallel on the same machine or accessible via the network to function properly.
Right now, the proxy config allows for sessions on the same host, but can be changed to allow for sessions with different hosts.
An account must be created / available to use the application. Therefore, the backend has to be set up.

The UI structure was laid with Bootstrap, while tags were styled with SCSS.
Angular Material UI is implemented for the use of production-ready components.

### Backend

The backend can be found at [Taskhub API](https://github.com/Caperino/taskhub).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
