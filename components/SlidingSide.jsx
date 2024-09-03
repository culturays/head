import Link from 'next/link';
import { useRef } from 'react';
import { useState, useEffect } from 'react';  
const SlidingSide = ({ newsItems, speed = 50000}) => {
  const tickerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    let startPosition = tickerElement.scrollWidth;

    const animateTicker = () => {
      startPosition--;
      tickerElement.style.transform = `translateX(-${startPosition}px)`;

      if (startPosition <= 0) {
        startPosition = tickerElement.scrollWidth;
      }

      requestAnimationFrame(animateTicker);
    };

    const tickerInterval = setInterval(animateTicker, speed);
    return () => clearInterval(tickerInterval);
  }, [speed]);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(prev => !prev);
  };
// Function to format time from seconds to MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);
  
  // Pad seconds with leading zero if necessary
  const formattedSeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;

  return `${minutes}:${formattedSeconds}`;
}

// Reference the video element
 
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
    <div className='relative p-5 shadow-xl flex'>
      <div className='flex' ref={tickerRef}>
        {newsItems.concat(newsItems).map((item, index) => (
   <div className='flex p-2 border-r border-gray-700 px-11' key={index}>         
          <div className="w-screen sm:w-1/2 cursor-pointer h-32 overflow-hidden py-2">  
          <video 
          ref={videoRef}
          className='inline hover:opacity-80' 
     poster={item.featuredImage.node.sourceUrl} >
    <source src={item.videos.videoUrl.node.mediaItemUrl} type="video/mp4"/>
    <source src={item.videos.videoUrl.node.mediaItemUrl} type="video/ogg"/>
    <source src={item.videos.videoUrl.node.mediaItemUrl} type="video/webm"/>
    <object data={item.videos.videoUrl.node.mediaItemUrl} >
    <embed src={item.videos.videoUrl.node.mediaItemUrl}/>
    </object>
</video>
 
</div> 

 <div className="px-3 cursor-pointer w-max py-2">    
 <Link href={`/videos/video/${item.slug}`}>
 <h2 key={index} className='text-xl font-bold text-gray-700 hover:text-orange-800'>
        {item.title}
    </h2></Link> 
    </div>
      </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingSide;