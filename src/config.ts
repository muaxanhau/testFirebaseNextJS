import { DevToolConfigModel, EnvironmentsConfigModel } from "./models";

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: "http://localhost:3000/v1/api/",
    staleTime: 1000 * 15,
    firebase: {
      apiKey: "AIzaSyAtILtR03J6ABceZ4TD0GFtgEE39QW8WMI",
      authDomain: "testfirebase-fe46e.firebaseapp.com",
      projectId: "testfirebase-fe46e",
      storageBucket: "testfirebase-fe46e.appspot.com",
      messagingSenderId: "906313130942",
      appId: "1:906313130942:web:8c8f695874c77a9f3c4fef",
      measurementId: "G-J4K94B6GTZ",
    },
    tokenName: "firebase-token",
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: "",
    staleTime: 1000 * 15,
    firebase: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    },
    tokenName: "",
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: "",
    staleTime: 1000 * 15,
    firebase: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    },
    tokenName: "",
  },
} as const;

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.DEVELOPMENT;

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  delayFetching: 0, // delay fetch data from server
};
