const wrapper = document.querySelector('.wrapper'),
    musicImg = document.querySelector('.image-area img'),
    musicName = document.querySelector('.song-details .name'),
    mainAudio = document.querySelector('#main-audio'),
    playPauseBtn = document.querySelector('.play-pause'),
    musicArtist = document.querySelector('.song-details .artist'),
    play = document.querySelector('#play'),
    next = document.querySelector('#next'),
    prev = document.querySelector('#prev'),
    progressBar = document.querySelector('.progress-bar'),
    progressArea = document.querySelector('.progress-area'),
    pause = document.querySelector('#pause');

let musicIndex = 1

console.log(progressBar)
console.log(progressArea)

window.addEventListener('load', () => {
    loadMusic(musicIndex)
})





next.addEventListener('click', () => {
    nextMusic();
})


prev.addEventListener('click', () => {
    prevMusic();
})
function prevMusic() {
    /* song.js deki indekleri arttırır */
    musicIndex--;
    /* eğer index sayisi fazla olursa ilk şarkıya döner */
    musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
    /*  müzkl resimleri ve açıklamayı erkana getirir */
    loadMusic(musicIndex);
    /*  müziği otomatik çağırır */
    playMusic()
}



function nextMusic() {
    /* song.js deki indekleri arttırır */
    musicIndex++;
    /* eğer index sayisi fazla olursa ilk şarkıya döner */
    musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    /*  müzkl resimleri ve açıklamayı erkana getirir */
    loadMusic(musicIndex);
    /*  müziği otomatik çağırır */
    playMusic()
}

function loadMusic(indexNumb) {

    musicName.innerHTML = allmusic[indexNumb - 1].name;
    musicArtist.innerHTML = allmusic[indexNumb - 1].artist;
    musicImg.src = `images/${allmusic[indexNumb - 1].img}.jpg`
    mainAudio.src = `songs/${allmusic[indexNumb - 1].src}.mp3`
}
/* müzik başlatma fonksitonu */
function playMusic() {

    wrapper.classList.add("paused")
    play.style.display = 'none'
    pause.style.display = 'block'
    mainAudio.play();
}
/* müzik durdurma fonksitonu */
function pauseMusic() {
    wrapper.classList.remove("paused")
    pause.style.display = 'none'
    play.style.display = 'block'
    mainAudio.pause();
}


playPauseBtn.addEventListener('click', () => {
    const ismusicPaused = wrapper.classList.contains("paused");
    /* koşul sunar eğer wrapperin clasında paused varsa  playmusiz adlı fonksiyon çağrılır yoksa pausemusic adlı fonksiyon çağrılır*/
    ismusicPaused ? pauseMusic() : playMusic()
})


mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`


    let musicCurrentTime = document.querySelector('.current'),
        musicDuration = document.querySelector('.duration');


    mainAudio.addEventListener('loadeddata', () => {


        /* MÜZİĞİN TOTAL SÜRESİNİ GÖSTEREN KISIM */
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }


        musicDuration.innerHTML = `${totalMin}:${totalSec}`
        /* */


    })


    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`
})





