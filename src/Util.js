export const playAudio = (isPlaying, audioRefHTML) => {
  if (isPlaying) {
    //Cuando la cancion termine de cargar ahi recien play
    const playPromise = audioRefHTML.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => audioRefHTML.current.play());
    }
  }
};
