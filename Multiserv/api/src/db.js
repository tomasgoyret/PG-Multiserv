const dotenv = require("dotenv");
dotenv.config();
const firebase = require("firebase-admin");

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  KEYPATH,
  MESSAGING_SENDER_ID,
  APP_ID
} = process.env;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId:APP_ID
};


var serviceAccount = require(KEYPATH);

firebase.initializeApp({
  firebaseConfig,
  credential: firebase.credential.cert(serviceAccount)
}); 

const db = firebase.firestore();

const auth= firebase.auth();

module.exports = {
  db,
  auth
} 
