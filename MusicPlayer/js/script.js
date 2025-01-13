const content = document.querySelector(".content")
Playimage = content.querySelector(".music-image img")
musicName = content.querySelector(".music-titles .name")
musicArtist = content.querySelector(".music-titles .artist")
Audio = document.querySelector(".main-song")
playBtn = content.querySelector(".play-pause")
playBtnIcon = content.querySelector(".play-pause span")
prevBtn = content.querySelector("#prev")
nextBtn = content.querySelector("#next")
progressBar = content.querySelector(".progress-bar")
progressDetails = content.querySelector(".progress-details")

let index = 1;

window.addEventListener("load", ()=>{
  loadData(index);
});

function loadData(indexValue){
  musicName.innerHTML= songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Playimage.src = "images/"+songs[indexValue - 1].img+".jpg";
  Audio.src = "music/"+songs[indexValue - 1].audio+".mp3";
}
//playbtn to appear when song is paused and vice-versa
playBtn.addEventListener("click", ()=>{
  const isMusicPaused = content.classList.contains("paused"); //checks whether song is paused or not 
  console.log(content.classList)
  if(isMusicPaused){
    pauseSong();
  }
  else{
    playSong();
  }
});

function playSong(){
  content.classList.add("paused");
  playBtnIcon.innerHTML = "pause";
  Audio.play();
}

function pauseSong(){
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "play_arrow";
  Audio.pause();
}

nextBtn.addEventListener("click", ()=>{
  nextSong();
});

prevBtn.addEventListener("click", ()=>{
  prevSong();
});

function nextSong(){
  index++;
  if(index > songs.length){
    index = 1;
  }
  else{
    index = index;
  }
  loadData(index);
  playSong();
}

function prevSong(){
  index--;
  if(index <= 0){
    index = songs.length;
  }
  else{
    index = index;
  }
  loadData(index);
  playSong();
}

Audio.addEventListener("timeupdate", (e)=>{
  console.log(e)
  const initialTime = e.target.currentTime; // Get current music time
  const finalTime = e.target.duration; // Get music duration
  let BarWidth = (initialTime / finalTime) * 100;
  progressBar.style.width = BarWidth+"%"; //increases the bar width accordingly..

  progressDetails.addEventListener("click", (e)=>{
    let progressValue = progressDetails.clientWidth; // Get width of Progress Bar
    let clickedOffsetX = e.offsetX; // get offset x value
    let MusicDuration = Audio.duration; // get total music duration

    Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
    console.log((clickedOffsetX / progressValue) * MusicDuration)
  });

  //Timer Logic
  Audio.addEventListener("loadeddata", ()=>{
    let finalTimeData = content.querySelector(".final");

    //Update finalDuration
    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if(finalSeconds < 10){
      finalSeconds = "0"+finalSeconds;
    }
    finalTimeData.innerText = finalMinutes+":"+finalSeconds;
  });

  //Update Current Duration
  let currentTimeData = content.querySelector(".current");
  let CurrentTime = Audio.currentTime;
  let currentMinutes = Math.floor(CurrentTime / 60);
  let currentSeconds = Math.floor(CurrentTime % 60);
  if(currentSeconds < 10){
    currentSeconds = "0"+currentSeconds;
  }
  currentTimeData.innerText = currentMinutes+":"+currentSeconds;
});
// when one song completly ends then moving onto next song
Audio.addEventListener("ended", ()=>{
  nextSong()
});