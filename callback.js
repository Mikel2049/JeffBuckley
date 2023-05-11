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
function getTopTracks(access_token) {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // log the data for debugging
        let tracks = data.items;
        let trackList = document.getElementById('tracks');
        tracks.forEach(track => {
            let listItem = document.createElement('li');
            listItem.textContent = `${track.name} by ${track.artists[0].name}`;
            trackList.appendChild(listItem);
        });
    })
    .catch(e => {
        console.log('There was a problem with the fetch operation: ' + e.message);
    });
}

window.onload = function() {
    let params = getQueryParams();
    let access_token = params['access_token'];

    if (access_token) {
        getTopTracks(access_token);
    } else {
        console.log('Access token not found');
    }
}
