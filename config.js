// Copy this config file to config.js and change the values to values that fit your environment
const DOMAIN = process.env.DOMAIN || 'http://localhost:8080';
const API_ROOT = process.env.API || 'http://localhost:3000/api';

// transport
const PHYSICAL_MODES = {
  bus: 'physicalMode:Bus',
  tramway: 'physicalMode:Tramway'
};
// APPLICATION KEY
const FACEBOOK = {
  APP_ID: '322828988048328'
};

const LINKEDIN = {
  APP_ID: '77oup879xvs1cq',
  AUTHORIZATION_REDIRECT: encodeURIComponent(DOMAIN + '/login'),
  STATE_CODE: 'XZqFcIAH4Iydf85pT8iygRpU',
  SCOPE: encodeURIComponent('r_basicprofile r_emailaddress')
};

const GOOGLE_ANALYTICS = {
  TRACK_ID: 'UA-31282630-8'
};

const CALLBACK_URL = encodeURIComponent(DOMAIN + '/callback');
const FORGOT_PASSWORD_CALLBACK = encodeURIComponent(DOMAIN + '/retrieve-password');

//exports modules
module.exports = {
  API_ROOT: API_ROOT,
  PHYSICAL_MODES: PHYSICAL_MODES,
  FACEBOOK: FACEBOOK,
  LINKEDIN: LINKEDIN,
  GOOGLE_ANALYTICS: GOOGLE_ANALYTICS,
  CALLBACK_URL: CALLBACK_URL,
  FORGOT_PASSWORD_CALLBACK: FORGOT_PASSWORD_CALLBACK
};
