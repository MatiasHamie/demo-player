import React, { useEffect } from "react";

// esto esta googleando fontawesome react en google y te salta la info
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
// import { playAudio } from "../Util";

export const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRefHTML,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  useEffect(
    (songs, setSongs) => {
      setSongs(
        songs.map((s) => {
          return {
            ...s,
            active: s.id === currentSong.id,
          };
        })
      );
    },
    [currentSong]
  );

  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRefHTML.current.pause();
    } else {
      audioRefHTML.current.play();
    }
  };

  //   Formatea en Minutos y segundos
  const getTime = (time) => {
    const minutos = Math.floor(time / 60);
    //   pongo %60 para que cuando pase de 59 sea 0
    const segundos = ("0" + Math.floor(time % 60)).slice(-2);
    return `${minutos}:${segundos}`;
  };

  // Permite mover a mano el slider del tiempo
  const dragHandler = (e) => {
    audioRefHTML.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(
      direction === "skip-back"
        ? songs[currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1]
        : songs[(currentIndex + 1) % songs.length]
    );

    if (isPlaying) audioRefHTML.current.play();

    // playAudio(isPlaying, audioRefHTML);
  };

  //agregando estilos
  // no olvidar el % al final, asi funciona el traslateX()
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
