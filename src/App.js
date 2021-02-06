// Estilos
import "./styles/app.scss";
// Agrego componentes
import { Player } from "./components/Player";
import { Song } from "./components/Song";
// Importo el hook con la info
import datosDeChillPop from "./data";
import { useRef, useState } from "react";
import { Library } from "./components/Library";
import { Nav } from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(datosDeChillPop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  /**
   * Para referenciar desde aca a un elemento html del JSX
   * uso el useRef, inicializandolo como null, y en el html
   * del JSX deseado uso la prop ref = {variable del useRef}
   *
   * Ahora puedo hacer que se reproduzca el audio,
   * para acceder a la etiqueta/elemento q me guarde por ref
   * uso variable de use ref . current
   */
  const audioRefHTML = useRef(null);

  /**
   * Se invoca cada vez que:
   * 1) cambia la duracion transcurrida de la cancion
   * 2) se cargan los metadatos del <audio></audio> asi no dependemos
   * de apretar play para que aparezca el tiempo que dura una cancion
   */
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    //calcular porcentaje para animacion del slider y sus colores
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration: duration,
      animationPercentage: animationPercentage,
    });
  };

  // cuando termina la cancion se pasa a la siguiente
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(
      songs[currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1]
    );
    if (isPlaying) audioRefHTML.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} `}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRefHTML={audioRefHTML}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRefHTML={audioRefHTML}
        libraryStatus={libraryStatus}
      />

      {/* onTimeUpdate es como el onchange pero se fija el tiempo del audio */}
      <audio
        ref={audioRefHTML}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
