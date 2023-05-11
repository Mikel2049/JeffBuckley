// login.js
document.getElementById('spotify-login-btn').addEventListener('click', function() {
    const clientId = 'b53ae3b8a9b44bb48452664002cfe0ea';
    const redirectUri = 'https://mikel2049.github.io/JeffBuckley/callback.html';
    const scopes = 'user-read-private user-read-email user-top-read';
    window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
});
