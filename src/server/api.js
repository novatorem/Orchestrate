var result = null;
const log = console.log
var SpotifyWebApi = require('spotify-web-api-node');

// Set necessary parts of the credentials on the constructor
var spotifyApi = new SpotifyWebApi({
    clientId: 'c864779931de4b198db341bf46d8c11c',
    clientSecret: '18ed34a923014ec6a10f6a8946e8289a'
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Authenticates a function before calling it
async function authenticateWrapper(func, argv) {
    result = null;
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            let accessToken = data.body['access_token']
            spotifyApi.setAccessToken(accessToken);
            func(...argv)
        },
        function(err) {
            console.error('Something went wrong!', err);
        }
    );
    while (result === null) {
        await sleep(1);
    }
    let temp = result;
    result = null; 
    return temp;
}

function getSongJson(trackID) {
    spotifyApi.getTrack(trackID, { market: 'US' },
        function(err, data) {
            if (err) {
                console.error('Something went wrong!');
            } else {
                result = data.body;
            }
        }
    );
}

function findSong(trackName, trackArtist) {
    spotifyApi.searchTracks('track:' + trackName + ' artist:' + trackArtist)
    .then(function(data) {
        result = data.body
    }, function(err) {
        console.log('Something went wrong!', err);
    });
}

module.exports = {
    authenticateWrapper,
    getSongJson,
    findSong
}
