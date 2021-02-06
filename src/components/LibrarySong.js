import React from "react";
// import { playAudio } from "../Util";

export const LibrarySong = ({
  song,
  songs,
  setSongs,
  audioRefHTML,
  isPlaying,
  setCurrentSong,
  currentSong,
}) => {
  const updateSongs = () => {
    setSongs(
      songs.map((s) => {
        return {
          ...s,
          active: s.id === song.id,
        };
      })
    );
  };

  const songSelectHandler = async () => {
    await setCurrentSong(song);
    if (isPlaying) audioRefHTML.current.play();
    // playAudio(isPlaying, audioRefHTML)
  };

  return (
    <div
      onClick={() => {
        songSelectHandler();
        updateSongs();
      }}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
