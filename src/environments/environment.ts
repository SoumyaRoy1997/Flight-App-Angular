// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://localhost:8088/Flight-App/',
  firebaseconfig:
  {
    apiKey: 'AIzaSyC48zlUUdvVqMLPxCSP4g7jVp_Mttib8CI',
    authDomain: 'flight-app-ng.firebaseapp.com',
    databaseURL: 'https://flight-app-ng.firebaseio.com',
    projectId: 'flight-app-ng',
    storageBucket: 'flight-app-ng.appspot.com',
    messagingSenderId: '315433589616',
    appId: '1:315433589616:web:fd11de5dea92f48b93cdb5',
    measurementId: 'G-WTCWLZL7CZ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
