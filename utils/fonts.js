import { Open_Sans, Concert_One, Prosto_One, Playfair, Inria_Serif, Roboto, Bellota_Text, Nokora } from 'next/font/google';
export const openSans = Open_Sans({ 
    subsets: ['latin'], 
    variable:'--font-opensans',
    weight:'300',
    display: 'swap',  
});
// export const inter = Inter ({ 
//     subsets: ['latin'], 
//     variable:'--font-opensans',
//     weight:'300',
//     display: 'swap',  
// });

export const concert =Concert_One({
subsets:['latin'], 
 weight:'400',
 display: 'swap', 
 })
 export const prosto =Prosto_One({
    subsets:['latin'], 
     weight:'400',
     display: 'swap', 
     })
    
 export const robo =Roboto({
    subsets:['latin'], 
     weight:'400',
     display: 'swap', 
     })
     export const inria =Inria_Serif({
        subsets:['latin'], 
         weight:'700',
         display: 'swap', 
         })

         export const play =Playfair({
            subsets:['latin'], 
             weight:'400',
             display: 'swap', 
             }) 
            //  export const fjord =Fjord_One({
            // subsets:['latin'], 
            //  weight:['400'],
            //  display: 'swap', 
            //  })  
             
             export const bellota =Bellota_Text({
            subsets:['latin'], 
             weight:['300', '400', '700'],
             display: 'swap', 
             })
          
             