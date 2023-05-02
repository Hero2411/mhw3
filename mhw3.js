const client_id = "59e0ac9e0cf947749b2f60ffd443782f";
const client_secret = "db1fcf0d04cf49f9a9f45e2b408e4bd6";
const get_token_url = "https://accounts.spotify.com/api/token";
const search_url = "https://api.spotify.com/v1/search";
const quote_url = "https://api.quotable.io/quotes/random?tags=philosophy&maxLength=100"

async function get_token() {
    const response = await fetch(get_token_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret.split("").reverse().join("")}`
    });
    const data = await response.json();
    return data.access_token;
}

async function searchSongs() {
    const token = await get_token();
    const response = await fetch(`${search_url}?q=track%3ACaparezza&type=track&market=IT`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    const songs = data.tracks.items;
    const song_container = document.getElementById("songs_container")
    songs.forEach((song, index) => {
        const p = document.createElement("p");
        p.innerHTML = (`${index + 1}. ${song.name} - ${song.artists[0].name}`);
        song_container.appendChild(p);
    });
    song_container.style.display = "block"
}

async function load_quote() {
    const response = await fetch(quote_url, {
        method: 'GET',
    });
    const data = await response.json();
    const quote = document.querySelector('#random_quote');
    console.log(data)
    quote.innerHTML = data[0]["content"];
}
load_quote()
const search_button = document.querySelector('#spotify_search');
search_button.addEventListener('click', searchSongs)