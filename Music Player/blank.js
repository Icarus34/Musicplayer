// selectors //

const musiccontainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('progress');
const progresscontainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


//event listeners//

playBtn.addEventListener('click', () => {
const isPlaying = musiccontainer.classList.contains('play');

if(isPlaying) {
    pauseSong();
} else {
    playSong();
}
});

//CHANGE SONG EVENT
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progresscontainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);






// array of song titles
const songs = ['Landmines', 'Distractions', 'Master_Quest'];

// keep track of songs
let songIndex = 1;

// load songs
loadSong(songs[songIndex]);




//functions//


// song functions
function loadSong(song) {
    title.innerText = song;
    audio.src = `songs/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
musiccontainer.classList.add('play');
playBtn.querySelector('i.fas').classList.remove('fa-play');
playBtn.querySelector('i.fas').classList.add('fa-pause');

audio.play();
};

function pauseSong() {
    musiccontainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress (e) {
const {duration, currentTime} = e.srcElement
const progressPercent = (currentTime / duration) * 100
progress.style.width = `${progressPercent}%`
}

function setProgress (e) {
    const width = this.clientwidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

