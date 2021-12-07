const {google} = require('googleapis');
const keys = require("./keys.json");

// install: npm install googleapis@39 --save
//console.developers.google.com
//https://developers.google.com/identity/protocols/oauth2/scopes
//Create credentials: https://developers.google.com/workspace/guides/create-credentials?authuser=1#web
// Service Email ID: serviceman11@youtube-kodi-151713.iam.gserviceaccount.com

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
        gsrun(client);
    }
});


async function gsrun(cl) {
    const gsapi = google.sheets({
        version: 'v4',
        auth: cl
    });

    const opt = {
        spreadsheetId: '116rgysh5iI8s__LBiDue7PJSiuB1Dn2NVkurN27qF78',
        range: 'Data!A2:B6'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;

    // taking care of cells with blank values
    dataArray.map(function(r) {
        while(r.length < 2) {
            r.push('');
        };
        return r;
    });

    let newDataArray = dataArray.map(function(r) {
        r.push(r[0] + '-' + r[1]);
        return r;
    });
    console.log(newDataArray);

    const updateOptions = {
        spreadsheetId: '116rgysh5iI8s__LBiDue7PJSiuB1Dn2NVkurN27qF78',
        range: 'Data!E2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray}
    };

    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res);
}