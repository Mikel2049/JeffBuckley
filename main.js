// This should be a safer place in a real application
let client_id = 'b53ae3b8a9b44bb48452664002cfe0ea';
let redirect_uri = 'https://mikel2049.github.io/JeffBuckley/';
let state = generateRandomString(16);
let access_token = null;

// generate a random string
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// get the returned query parameters
function getQueryParams() {
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1),
        params = {};

    while (e = r.exec(q)) {
        params[e[1]] = decodeURIComponent(e[2]);
    }
    return params;
}

// use the access token to access the Spotify Web API
function getTopTracks() {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.items); // list of top tracks
    });
}

window.onload = function() {
    let params = getQueryParams();
    access_token = params['access_token'];

    if (access_token) {
        getTopTracks();
    } else {
        let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent('user-read-private user-read-email user-top-read')}&response_type=token&state=${state}`;
        window.location.href = url;
    }
}
