"use client"
 
import Image from 'next/image'
import Link from 'next/link' 
import { useRouter } from 'next/navigation'
import { useState, useEffect} from 'react' 

const Character = ({ character_data, related_chars }) => { 
//  const itemtext = character_data.content.raw.children.map((typeObj, index) => {
//     const children = typeObj.children.map((item, itemindex) => item.text ) ;
// return children      
//   })  
const router =useRouter()
const {slug}=router 
const [scrollTop, setScrollTop] = useState(0);

useEffect(() => {
  const handleScroll = event => {
    setScrollTop(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
const [hiddenState, setHidden] = useState(true);
 const navSelect=()=>{
setHidden(true)
 }
const navShadow = {
boxShadow: "0 3px 10px rgb(68, 65, 65)"
};
const replaceHTMLTags=(string)=>{
  const regex = /(<([^>]+)>)/gi;
  //(/<\/?[^>]+(>|$)/g, "")
  const newString = string.replace(regex, "");
  return newString
   }
  return ( 
    <div >      
 <nav className="sticky bg-white flex justify-center p-8 my-8 z-20 " style={navShadow}>  
<h1 className='opacity-70 italic text-2xl'>{character_data.title.toLowerCase()} </h1>     
<div className='flex justify-center'>
<h3 className='m-3 text-3xl text-center'> 
{character_data.title} </h3>
<span className='cursor-pointer opacity-70 text-3xl mt-5' 
onMouseEnter={() => setHidden(prev => !prev)}
>&#9660;</span>
 </div>  

<div className='text-white p-2'> 
<ul className={hiddenState?'hidden':'block absolute w-1/4 m-auto bg-gray-800 top-28 left-1/2 animate-in text-center'}>
  <div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.slug }`}><li className='text-lg 'onClick={navSelect}>News </li></Link>
<span className='text-2xl cursor-pointer hover:scale-150 '>&#10095;</span>
</div>
<div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.charactertitles.portrayedby.toLowerCase().replace(/ /g,'-')}`}><li onClick={navSelect} className='text-lg'>{character_data.title } </li></Link>
<span className='text-2xl cursor-pointer hover:scale-150 '>&#10095; </span>
</div>
<div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.charactertitles.filmname.toLowerCase().replace(/ /g,'-')}`}><li className='text-lg'>{character_data.charactertitles.filmname} </li></Link> 
<span className='text-2xl cursor-pointer hover:scale-150'>&#10095;</span></div>
</ul>
 </div>
</nav>  
  
<div className='relative lg:h-screen'> 
 
<div className='flex flex-col items-center justify-center bg-cover bg-center h-screen'style={{'backgroundImage': `url(${character_data.charactertitles?.filmImg1.node.sourceUrl})`,  
  backgroundRepeat: 'no-repeat',
      backgroundPosition: '',  
      backgroundColor: 'transparent',
      backgroundSize: 'cover'}}/> 
       <div className="bg-gray-600 relative text-orange-600">
  <p className="absolute bottom-5 z-50 left-8 p-6 leading-8 font-mono font-bold">Photo: {replaceHTMLTags(character_data.charactertitles?.filmImg1.node.caption)}</p>
 
 </div>
<div className='flex flex-wrap p-4 justify-between bg-gray-900 border-t'> 
  <div >
  <span className='p-2 text-blue-600'>tags:</span> 
  {character_data.contentTags.nodes.map((xy, i)=><Link key={i}href={`/topic/${xy.slug }`}><p className='p-2 text-gray-100 relative z-50 hover:text-blue-600'>  
{ xy.name }</p></Link> )} 
</div> 
<Link href={`/naija-wiki/characters/${character_data.charactertitles.filmname.toLowerCase().replace(/ /g,'-') }`}><p className='p-2 text-blue-600 hover:text-gray-400 relative z-50'>  
All {character_data.charactertitles.filmname} Characters</p></Link> 
</div>

<div className='lg:absolute h-full z-10 top-0 bottom-0 bg-gray-900 bg-opacity-90 left-0 right-0 mx-auto shadow-detailShadow py-8 px-8'> 
<div className='lg:flex xs:max-w-7xl px-3 bg-white flex-row-reverse m-auto justify-center items-center lg:h-full '> 
<div className='w-3/4 max-w-xs m-auto my-11' > 
<h2 className='text-3xl text-center p-6 bg-gray-400 '> {character_data.title}</h2>
 
<div className='rounded border border-gray-200 '>
<Image 
src={character_data.featuredImage.node.sourceUrl} 
width={1250}
height={675}
alt='wikiimages'
/> </div> 
<div className='my-2 bg-gray-200 rounded border border-gray-200'> 
<p className='py-6 px-2 border-b border-gray-300 text-lg'><b> Name:</b> {character_data.title}</p>
<p className='py-6 px-2 border-b border-gray-300  text-lg'><b>Known as: </b>{character_data.charactertitles.characterOtherName || '-'} </p>
<p className='py-6 px-2 border-b border-gray-300 text-lg'><b>Played By: </b>{character_data.charactertitles.portrayedby}</p> 
<p className='py-6 px-2 border-b text-lg'><b>Family: </b> {character_data.charactertitles.filmFamily}</p>
</div>  

</div> 

<div className='p-2 sm:w-11/12 m-auto'>  
<div className='py-2 text-lg'>{replaceHTMLTags(character_data.excerpt)} </div>
<h3 className='text-2xl font-bold py-2'> Bios </h3 >
<hr/>  
<p className='py-6 text-lg'>{character_data.charactertitles.charBios}</p>
<span className='text-2xl py-2 font-bold'>Information</span>
<hr/>
<div className='py-2 text-lg'>{replaceHTMLTags(character_data.content)} </div> 
</div>  

</div> 
 
</div>  
</div> 

 <section className='relatedActors py-11'> 
 <h2 className='text-3xl font-bold text-center text-gray-200 opacity-80 border-b'>More Characters</h2>
 <div className="md:grid md:grid-cols-2 justify-center gap-2 max-w-6xl px-6 m-auto py-11">      
{related_chars.filter((xy)=> xy.slug!==character_data.slug ).slice(0,4).map((itex, index)=>
<div key={index} className='border m-1 h-32 xs:h-44 sm:h-56 flex shadow-2xl my-3 md:m-auto  md:w-full my-2'>  
<Image
className='w-1/2 h-auto'
src={itex.featuredImage.node.sourceUrl} 
width={1200}
height={550}
alt={ itex.title }
/>  
<div className='w-1/2'>
  <Link href={`/naija-wiki/character/${itex.slug}`}>
<h3 className='text-2xl p-5 text-center my-20 font-bold'>{ itex.title }</h3></Link> 
 
</div>  
  </div>  
   ) }

   </div>

</section>   
  
</div>  
  )
}

  
export default Character