var songTitle="";
var artistName="";

const clientID = 'e68450fbeb9f4cad98858a84d332f677'; // Replace with your Spotify Client ID
const redirectURI = 'http://localhost:8080/index.html'; // Replace with your redirect URI
const scopes = [
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ');

// Spotify Authentication URL
const authURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectURI)}`;

// Get token from URL
let token = new URLSearchParams(window.location.hash.substring(1)).get('access_token');
if (!token) {
  window.location.href = authURL; // Redirect to Spotify authorization
}

let player;

// Initialize Spotify Web Playback SDK
window.onSpotifyWebPlaybackSDKReady = () => {
  player = new Spotify.Player({
    name: 'Spotify Web Player',
    getOAuthToken: cb => cb(token),
    volume: 0.5,
  });

  // Event: Player Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    document.getElementById('status').textContent = 'Player is ready!';
    transferPlayback(device_id);
  });

  // Event: Player not ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    document.getElementById('status').textContent = 'Player is not ready!';
  });

  player.connect();
};

// Transfer playback to web player
function transferPlayback(device_id) {
  fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ device_ids: [device_id], play: false }),
  });
  artistName = document.getElementById('Artist').innerHTML;
  songTitle = document.getElementById('Title').innerHTML;
  console.log(songTitle+'\t'+artistName);
  searchTrack(songTitle, artistName)
      .then(trackId => playTrack(trackId))
      .catch(err => {
        console.error(err);
        document.getElementById('status').textContent = 'Failed to find or play track.';
      });
}

// Search for a track using Spotify API
function searchTrack(trackName, artistName) {
  const query = `track:${trackName} artist:${artistName}`;
  return fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.tracks.items.length > 0) {
        document.getElementById('Title').innerHTML = 'Title: '+data.tracks.items[0].name;
        document.getElementById('Artist').innerHTML = 'Artist: '+data.tracks.items[0].artists[0].name;
        var albumimg = data.tracks.items[0].album.images[0].url;
        document.getElementById('AlbumArt').setAttribute('style',`background-image:linear-gradient(to right, #000000e6,#00000000),url(${albumimg})`);
        return data.tracks.items[0].id;
      } else {
        throw new Error('Track not found');
      }
    });
}

// Play a track using Spotify API
function playTrack(trackId) {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uris: [`spotify:track:${trackId}`] }),
  })
    .then(() => {
      document.getElementById('status').textContent = 'Playing track!';
    })
    .catch(err => {
      console.error(err);
      document.getElementById('status').textContent = 'Failed to play track.';
    });
}


function setSongInfo(title, artist){
  console.log('setSongInfo call');
  songTitle=title;
  artistName=artist;
}

const playPauseBtn = document.getElementById('playPauseBtn');

async function getPlaybackState() {
  const response = await fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Playback state response:', response);

  if (response.status === 204) {
    console.warn('No content in response. The player might not be active.');
    return null;
  }

  if (response.status === 200) {
    const data = await response.json();
    console.log('Playback state data:', data);
    return data;
  } else {
    console.error(`Error fetching playback state: HTTP ${response.status}`);
    return null;
  }
}


// 재생/일시정지 토글 함수
async function togglePlayPause() {
  const playbackState = await getPlaybackState();

  if (!playbackState || !playbackState.is_playing) {
    // 재생 중이 아니면 재생
    await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      document.getElementById('status').textContent = 'Playing track!';
      playPauseBtn.textContent = '⏸ Pause';
    }).catch(err => {
      console.error('Error during play:', err);
      document.getElementById('status').textContent = 'Failed to play track.';
    });
  } else {
    // 재생 중이면 일시정지
    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      document.getElementById('status').textContent = 'Track paused!';
      playPauseBtn.textContent = '▶ Play';
    }).catch(err => {
      console.error('Error during pause:', err);
      document.getElementById('status').textContent = 'Failed to pause track.';
    });
  }
}

// 현재 재생 상태에 따라 버튼 초기화
async function initializePlayPauseButton() {
  const playbackState = await getPlaybackState();

  if (playbackState && playbackState.is_playing) {
    playPauseBtn.textContent = '⏸ Pause';
  } else {
    playPauseBtn.textContent = '⏸ Pause';
  }

  playPauseBtn.addEventListener('click', togglePlayPause);
}

// 초기화 함수 호출
initializePlayPauseButton();
