

var songs = [


    {
        id: 0,
        img: "images/music.jfif",
        name: "ambient-piano-amp-strings",
        artist: "ZakharValaha",
        audio: "Audios/ambient-piano-amp-strings.mp3"

    },
    {
        id: 1,
        img: "images/music.jfif",
        name: "morning-garden-acoustic-chill",
        artist: "Olexy",
        audio: "Audios/morning-garden-acoustic-chill.mp3"

    },
    {
        id: 2,
        img: "images/music.jfif",
        name: "slow-trap",
        artist: "Anton Vlasov",
        audio: "Audios/slow-trap.mp3"

    },
    {
        id: 3,
        img: "images/music.jfif",
        name: "the-cradle-of-your-soul",
        artist: "abcstudio",
        audio: "Audios/the-cradle-of-your-soul.mp3"

    }



]

const audio = document.getElementById("id1");
const img = document.getElementById('img')
const songname = document.getElementById('song-name')
const artist = document.getElementById('artist')



// btns
const play = document.getElementById('play-btn')
const pause = document.getElementById('pause-btn')
const next = document.getElementById('next')
const prev = document.getElementById('prev')


const progress = document.getElementById('progress-bar')
let current_time = document.getElementById('current-time')
let total_time = document.getElementById('duration')
const progress_area = document.getElementById('progress-area')



let current = 0;

window.addEventListener("DOMContentLoaded", function () {
    showPerson();
});

function showPerson() {

    const item = songs[current]
    audio.src = item.audio;
    img.src = item.img;
    songname.textContent = item.name;
    artist.textContent = item.artist

}

//Play  button

const playMusic = () => {

    audio.play()
    play.style.display = "none"
    pause.style.display = "block"

}
play.addEventListener('click', playMusic)

// pause button

pause.addEventListener('click', () => {
    audio.pause()
    play.style.display = "block"
    pause.style.display = "none"

})


// Next  button

const newsong = () => {
    current++
    if (current > songs.length - 1) {
        current = 0;
    }
    if (next) {
        pause.style.display = "none"
        play.style.display = "block"
    }
    showPerson(current)
    playMusic()
}

// prev button

const prevsong = () => {
    current--
    if (current < 0) {
        current = songs.length - 1;
    }
    if (prev) {
        pause.style.display = "none"
        play.style.display = "block"
    }
    showPerson(current)
    playMusic()

}


next.addEventListener('click', newsong)
prev.addEventListener('click', prevsong)


// progress bar 

audio.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    // console.log(currentTime)
    // console.log(duration)
    let progress_time = (currentTime / duration) * 100
    progress.style.width = `${progress_time}%`



    // time update

    let min_duration = Math.floor(duration / 60)
    let sec_duration = Math.floor(duration % 60)

    let total = `${min_duration}:${sec_duration}`

    if (duration) {

        total_time.textContent = `${total}`
    }

    // current time Update

    let min_currentTime = Math.floor(currentTime / 60)
    let sec_currentTime = Math.floor(currentTime % 60)

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`
    }


    let total_currentTime = `${min_currentTime}:${sec_currentTime}`

    if (currentTime) {

        current_time.textContent = `${total_currentTime}`
    }



})

// progress onclick 

progress_area.addEventListener("click", (event) => {
    // console.log(event)
    const { duration } = audio;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    audio.currentTime = move_progress
})

audio.addEventListener("ended", newsong)

