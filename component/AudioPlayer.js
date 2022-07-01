import React, {useState, useRef, useEffect} from 'react'
import styles from "../styles/AudioPlayer.module.css";
import {BsArrowLeftShort} from "react-icons/bs"
import {BsArrowRightShort} from "react-icons/bs"
import {FaPlay} from "react-icons/fa"
import {FaPause} from "react-icons/fa"
function AudioPlayer() {
 // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  //referecnces
const audioPlayer = useRef();   /// REF our audio component
const progressBar = useRef();   

useEffect(() => {
  const seconds = Math.floor(audioPlayer.current.duration)
  setDuration(seconds);
  progressBar.current.max = seconds;

}, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);


const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const returnMinutes = minutes < 10 ? '0${minutes}' : '${minutes}';
  const seconds = Math.floor(secs % 60);
  const returnSeconds = seconds < 10 ? '0${seconds}' : '${seconds}';

return '${returnMinutes}:{returnSeconds}';

}
  const togglePlayPause = () =>  {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if(prevValue){
      audioPlayer.current.play();
    }else{
      audioPlayer.current.pause();
    }
  }

const changeRange = () => {
  audioPlayer.current.currentTime = progressBar.current.value;
  progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
  setCurrentTime(progressBar.current.value);
}

  return (
    <div className={styles.audioPlayer}>

      <audio ref={audioPlayer} src="../democracy5.mp3" preload="metadata"></audio>
      <button className={styles.forwardBackward}><BsArrowLeftShort /> 30</button>
      <button onClick={togglePlayPause} className={styles.playPause}>

        { isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward}><BsArrowRightShort /> 30</button>
      {/* Current Time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/*Progress Bar*/}

      <div>
        <input type="range"  className={styles.progressBar} defaultValue="0" ref={progressBar} onchange={changeRange}/>
      </div>


      {/*Duration */}
       <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

    </div>
  );
}

export { AudioPlayer }   