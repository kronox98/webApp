// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // fireBaseConfig: false,
  mailUrl: 'https://us-central1-angular-web-app-fb872.cloudfunctions.net/sendMail',
  firebaseConfig : {
    apiKey: "AIzaSyDlHgBjuhgIvCKwH5MX-UqK8Mos_NcS4p4",
    authDomain: "angular-web-app-e08aa.firebaseapp.com",
    databaseURL: "https://angular-web-app-e08aa.firebaseio.com",
    projectId: "angular-web-app-e08aa",
    storageBucket: "angular-web-app-e08aa.appspot.com",
    messagingSenderId: "364799730760",
    appId: "1:364799730760:web:8ad0afd6d9dec32128247d",
    measurementId: "G-QRVETJ219Y"
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
