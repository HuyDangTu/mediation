const app = () => {
  //Get the audio tag
  const song = document.querySelector(".song");
  //Get the play button
  const play = document.querySelector(".play");
  //Get the video background
  const video = document.querySelector("video");
  //Get the circle of play button
  const outline = document.querySelector(".moving-outline circle");
  //Get the sound
  const sounds = document.querySelectorAll('.sound-picker button');
  //TimeDisplay
  const timeDisplay = document.querySelector('.time-display');
  //Get the length of the outline
  const outlineLength = outline.getTotalLength();
  //Get the time select button
  const timeSelect = document.querySelectorAll(".time-select button")

  //Duration:
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  let fakeDuration = 600;
  //Pick Time
  timeSelect.forEach(option => {
      option.addEventListener('click', () => {
        fakeDuration = option.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
      }
    );
  });

  // Pick different sound 
  sounds.forEach(sound => {
    sound.addEventListener("click", () => {
      song.scr = sound.getAttribute('data-sound');
      video.src = sound.getAttribute('data-video');
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    })
  });


  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //Animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    //Animate
    //currentTime increasing lead to the decrease of variable progress
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    //strokeDashoffet càng nhỏ thì phần trắng càng nhỏ
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime >= fakeDuration) {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
      song.currentTime = 0;                                                              
    }
  }
};

app();

