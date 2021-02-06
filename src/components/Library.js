import React from "react";
import { LibrarySong } from "./LibrarySong";

export const Library = ({
  songs,
  setSongs,
  audioRefHTML,
  isPlaying,
  setCurrentSong,
  libraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(
          (song) => (
            <LibrarySong
              key={song.id}
              song={song}
              setCurrentSong={setCurrentSong}
              songs={songs}
              audioRefHTML={audioRefHTML}
              isPlaying={isPlaying}
              setSongs={setSongs}
            />
          )
          //   console.log(song)
        )}
      </div>
    </div>
  );
};
