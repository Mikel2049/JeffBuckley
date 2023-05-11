const REDIRECT_URI = "https://mikel2049.github.io/JeffBuckley/callback.html";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-i-uJIoamOczv4JAfER39BNlACqm9RIK2bD3J9cnFBDIXwrjTN15vQEVw2dxxrCspSQ/exec";

window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
        try {
            const accessToken = await fetchAccessToken(code);
            const userData = await fetchUserData(accessToken);
            const topTracks = await fetchTopTracks(accessToken);

            document.getElementById('user-profile').innerHTML = '<pre>' + JSON.stringify(userData, null, 2) + '</pre>';
            document.getElementById('top-tracks').innerHTML = '<pre>' + JSON.stringify(topTracks, null, 2) + '</pre>';
        } catch (err) {
            console.error('Error getting Tracks', err);
        }
    } else if (error) {
        alert(`There was an error: ${error}`);
    }
};

async function fetchAccessToken(code) {
    let response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse.access_token;
    } else {
        throw new Error('Request failed!');
    }
}

async function fetchUserData(accessToken) {
    let response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse;
    } else {
        throw new Error('Request failed!');
    }
}

async function fetchTopTracks(accessToken) {
    let response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse;
    } else {
        throw new Error('Request failed!');
    }
}
