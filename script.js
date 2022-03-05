// Song search area activity
function getResults(searchValue) {
    let parent = document.getElementById('fancy-look');

    let result = '';
    let answer = '';
//Get first 10 results
    for (let i = 0; i < 10; i++) {
        let title = searchValue.data[i].title;
        let artist = searchValue.data[i].artist.name;
        let image = searchValue.data[i].artist.picture_small;

        result = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-8">
            <h3 class="lyrics-name" id="title">${title}</h3>
            <p class="author lead">Album by <span id="artistName">${artist}</span></p>
        </div>
        <div class="col-md-1">
            <img src="${image}" alt="">
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button  onclick="getArtist('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`;

        answer =  answer + result;
    }

    parent.innerHTML = answer;
}


// Get Artist Name and song title
function getArtist(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(song => showLyrics(song, title));
}

function showLyrics(song, title) {
    if (song.lyrics == undefined) {
        document.getElementById('displayLyrics').innerText = "This song has no lyrics";
    } else {
        document.getElementById('displayLyrics').innerText = song.lyrics;
    }
    document.getElementById('songTitle').innerText = title;
}



//Search Button Activity

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function() {
    const searchBoxArea = document.getElementById('searchBoxArea').value;

    fetch(`https://api.lyrics.ovh/suggest/${searchBoxArea}/`)
        .then(response => response.json())
        .then(data => getResults(data));
})