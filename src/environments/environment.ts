// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseURL: 'https://bookstoreapi20221224224723.azurewebsites.net',
  baseURL: 'https://localhost:7088',
  countryApiKey: 'bHFWR1JkMGZOcnZJcWlWSU1xc3puWTFCcERaTE9UTElHa3RZYUJNdg==',
  endPoints: {
    staticPage: '/api/StaticPage',
    generalService: '/api/GeneralService',
    blog: '/api/Blog',
    article: '/api/Article',
    teamMember: '/api/TeamMember',
    faq: '/api/Faq',
    contact: '/api/ContactUs',
  },
  images: {
    small: '/Images/Thumbs/Small/',
    med: '/Images/Thumbs/Med/',
    big: '/Images/Thumbs/Big/',
    team: '/Images/Thumbs/Team/',
    origen: '/Images/',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
