"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'; 

const ChangingText = ({ texts, interval }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const changeText = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(changeText);
  }, [2000]); 
  return (
    <div className='border bg-gray-500 bg-opacity-50 max-w-xl h-64'> 
    {/* to animate "text_changed" could be useful */}
  <Link href={`/news/${texts[currentIndex]?.node?.otherCategories.nodes[0].slug}/${texts[currentIndex]?.node?.slug}`}> <p className='text-animate-in underline px-4 font-bold py-16 cursor-pointer text-xl my-2 text-gray-100 hover:text-gray-400 text-center'>{texts[currentIndex]?.node?.title}</p></Link> 
 </div>
  );
};

export default ChangingText;
