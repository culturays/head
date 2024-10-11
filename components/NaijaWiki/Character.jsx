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
 
<div className='text-white p-2 relative left-0'> 
<ul className={hiddenState?'hidden':'block absolute w-56 z-30 m-auto bg-gray-800 top-10 right-10 animate-in text-center'}>
  <div className='flex justify-between m-4'> 
<Link href= {`/topic/${character_data.slug }`}><li className='text-lg'onClick={navSelect}>News </li></Link>
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
  
<div className=''>  


<div className='flex flex-wrap p-4 justify-between bg-gray-900 border-t'> 
  <div >
  <span className='p-2 text-blue-600'>tags:</span> 
  {character_data.contentTags.nodes.map((xy, i)=><Link key={i}href={`/topic/${xy.slug }`}><p className='p-2 text-gray-100 relative z-50 hover:text-blue-600'>  
{ xy.name }</p></Link> )} 
</div> 
<Link href={`/naija-wiki/characters/${character_data.charactertitles.filmname.toLowerCase().replace(/ /g,'-') }`}><p className='p-2 text-blue-600 hover:text-gray-400 relative z-50'>  
All {character_data.charactertitles.filmname} Characters</p></Link> 
</div>
<div className=' relative' >
    <div className='-z-50 bg-cover bg-center bg-gray-600 absolute h-full w-full'style={{'backgroundImage': `url(${character_data.charactertitles?.filmImg1.node.sourceUrl})`,  
     backgroundRepeat: 'no-repeat',
      backgroundPosition: '',  
      backgroundColor: 'transparent',
      backgroundSize: 'cover'}}/> 
    
  <p className="absolute bottom-0 z-50 left-8 p-6 leading-8 font-mono font-bold text-orange-600">Photo: {replaceHTMLTags(character_data.charactertitles?.filmImg1.node.caption)}</p>


  <div className='py-20 bg-gray-900 bg-opacity-90 m-auto shadow-detailShadow px-3'>   
  <div className='lg:flex xs:max-w-4xl px-3 bg-white flex-row-reverse m-auto justify-center items-center py-20'>
     
  <div className='max-w-xs m-auto' > 
  <div className='bg-gray-200 rounded border border-gray-200'> <h2 className='text-4xl p-4 bg-gray-400 font-bold'> {character_data.title}</h2> 
  <div className='rounded border border-gray-200 '>
  <Image 
  src={character_data.featuredImage.node.sourceUrl} 
  width={1250}
  height={675}
  alt='wikiimages'
  /> </div> 
  
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
 



</div>  

 <div className='bg-gray-700 my-8 py-11'> 
 <h2 className='text-3xl font-bold text-center text-gray-200 opacity-80 border-b'>More Characters</h2></div>
 <section className='relatedActors px-3 min-[1050px]:px-16 xl:px-24 min-[1100px]:max-w-6xl m-auto'> 
 
 <div className="sm:flex flex-wrap justify-center gap-1 m-auto min-[970px]:max-w-5xl">      
{related_chars.filter((xy)=> xy.slug!==character_data.slug ).slice(0,4).map((itex, index)=>
<div key={index} className='border max-h-48 flex shadow-2xl max-w-md m-auto my-2'>  
<Image
className='w-1/3 h-32'
src={itex.featuredImage.node.sourceUrl} 
width={1200}
height={550}
alt={ itex.title }
/>  
<div className='w-1/2 m-auto '>
  <Link href={`/naija-wiki/character/${itex.slug}`}>
<h3 className='text-2xl text-center py-4 font-bold'>{ itex.title }</h3></Link> 
<Link href={`/naija-wiki/character/${itex.slug}`}>
<div className='text-lg px-2 overflow-hidden text-ellipsis'style={{ display: '-webkit-box', WebkitLineClamp:2, WebkitBoxOrient: 'vertical' }} dangerouslySetInnerHTML={{__html:itex.excerpt}}/></Link> 
</div>  
  </div>  
   ) }

   </div>

</section>   
  
</div>  
  )
}

  
export default Character