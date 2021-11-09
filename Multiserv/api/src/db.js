const dotenv = require('dotenv');
dotenv.config();
const firebase = require('firebase-admin');
const { applicationDefault } = require('firebase-admin/app');


const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} = process.env;



const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp({
  firebaseConfig,
  credential: applicationDefault()
});

const db = firebase.firestore();

module.exports = db;