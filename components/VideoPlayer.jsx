import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState, useEffect } from 'react';
import moment from'moment'
const VideoPlayer = ({ videoSrc,posterSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(videoRef.current.currentTime);
    };

    const updateDuration = () => {
    setDuration(videoRef.current.duration);
    };

    videoRef?.current?.addEventListener('timeupdate', updateTime);
    videoRef?.current?.addEventListener('loadedmetadata', updateDuration);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateTime);
      videoRef.current?.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);
 
  return (
    <div>
         <video 
className="w-auto h-full cursor-pointer" onClick={handlePlay}poster={posterSrc} ref={videoRef}>
    <source src={videoSrc} type="video/mp4"/>
    <source src={videoSrc} type="video/ogg"/>
    <source src={videoSrc} type="video/webm"/>
    <object data={videoSrc} >
    <embed src={videoSrc}/>
    </object>
</video>
     
      <div className='relative'>
        <button onClick={handlePlay} >
          {isPlaying ?<span className="absolute top-28 left-0 right-0 text-center text-white text-4xl cursor-pointer"><FontAwesomeIcon icon={faPause}/></span> :<span className="absolute z-10 top-28 left-0 right-0 text-center text-white text-4xl cursor-pointer"><FontAwesomeIcon icon={faPlay}/></span> }
        </button>
        <div className='text-white absolute z-10 bottom-11 mx-5'>
        {duration.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
