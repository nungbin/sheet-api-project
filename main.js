const {google} = require('googleapis');
const keys = require("./keys.json");

// install: npm install googleapis@39 --save
//console.developers.google.com
//https://developers.google.com/identity/protocols/oauth2/scopes
//Create credentials: https://developers.google.com/workspace/guides/create-credentials?authuser=1#web


const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log('Connected!');
    }
});