import requests
import base64
import datetime
from urllib.parse import urlencode

# Step 1: Authorization Flow
# After the user has logged in and authorized your app, the Spotify API will redirect them back to your specified Redirect URI with an authorization code

# Step 2: Exchange Authorization Code for Access Token
client_id = 'b53ae3b8a9b44bb48452664002cfe0ea'
client_secret = '73740d6e32a84b3387d699daa120f80c'
redirect_uri = 'https://mikel2049.github.io/JeffBuckley/'

# Extract authorization code from query parameter
authorization_code = 'AUTHORIZATION_CODE_FROM_SPOTIFY'

# Encode client_id and client_secret as base64 string
client_creds = f'{client_id}:{client_secret}'
client_creds_b64 = base64.b64encode(client_creds.encode())

# Send a POST request to get access token
token_url = 'https://accounts.spotify.com/api/token'
token_data = {
    'grant_type': 'authorization_code',
    'code': authorization_code,
    'redirect_uri': redirect_uri
}
token_headers = {
    'Authorization': f'Basic {client_creds_b64.decode()}'
}
token_response = requests.post(token_url, data=token_data, headers=token_headers)

# Extract access token from response
access_token = token_response.json()['access_token']

# Step 3: Get User's Most Listened Songs for the Past Month
# Send a GET request to the Spotify Web API to get the user's most listened songs for the past month
today = datetime.datetime.now()
last_month = today - datetime.timedelta(days=30)
last_month_unix = int(last_month.timestamp()) * 1000  # Convert to milliseconds
limit = 10  # Get the top 10 songs

headers = {
    'Authorization': f'Bearer {access_token}'
}

query_params = urlencode({
    'limit': limit,
    'time_range': f'long_term'
})

endpoint = f'https://api.spotify.com/v1/me/top/tracks?{query_params}'
response = requests.get(endpoint, headers=headers)

# Extract the song names and artists from the response
if response.status_code == 200:
    top_tracks = response.json()['items']
    for i, track in enumerate(top_tracks):
        name = track['name']
        artist = track['artists'][0]['name']
        print(f'{i + 1}. {name} by {artist}')
else:
    print(f'Error {response.status_code}: {response.text}')
