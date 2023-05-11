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
    .then(response => response.json())
    .then(data => {
        let tracks = data.items
