let client_id = 'b53ae3b8a9b44bb48452664002cfe0ea'; // Replace with your client ID
let redirect_uri = 'https://mikel2049.github.io/JeffBuckley/callback.html'; // Update to your redirect URI
let state = generateRandomString(16);

// generate a random string
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// redirect to Spotify's authorization page
document.getElementById('login').addEventListener('click', () => {
    let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent('user-read-private user-read-email user-top-read')}&response_type=token&state=${state}`;
    window.location.href = url;
});
