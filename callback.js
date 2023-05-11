const REDIRECT_URI = "https://mikel2049.github.io/JeffBuckley/callback.html";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVBT_5WdapKpiitmRwhBeN8DIBDWOTujjMqBbIWRCggF-iZAf_UYPtIpovl_l4OpFosA/exec";

window.onload = function() {
    let params = getHashParams();
    let code = params.code;
    
    if(code){
        fetchAccessToken(code);
    }
}

function fetchAccessToken(code) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("code", code);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://script.google.com/macros/s/AKfycbx-i-uJIoamOczv4JAfER39BNlACqm9RIK2bD3J9cnFBDIXwrjTN15vQEVw2dxxrCspSQ/exec", requestOptions)
        .then(response => response.json())
        .then(result => {
            let accessToken = result.body.access_token;
            fetchUserData(accessToken);
            fetchTopTracks(accessToken);
        })
        .catch(error => console.log('error', error));
}

function fetchUserData(accessToken){
    fetch('https://api.spotify.com/v1/me',{
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + accessToken}
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('user').innerText = data.display_name;
    });
}

function fetchTopTracks(accessToken){
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10',{
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + accessToken}
    })
    .then((response) => response.json())
    .then((data) => {
        let list = document.getElementById('tracks');
        data.items.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerText = `${item.name} by ${item.artists[0].name}`;
            list.appendChild(listItem);
        });
    });
}

function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}
