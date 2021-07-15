// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'https://api.ka3.uni-koeln.de/',
  apiConversion: 'https://grails-prod.rrz.uni-koeln.de/ka3-ffmpeg',
  apiAnalysis: 'https://grails-dev.rrz.uni-koeln.de/ka3-analyse/jobOrder',
  apiProvider: 'https://ka3.uni-koeln.de/apidoc/index',
  apiQueryRepo: 'query/lac',
  apiObjectRepo: 'object/lac',
  apiMediaRepo: 'media/lac',
  apiDownloadRepo: 'download/lac',
  apiAnnotationRepo: 'annotation/lac'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
