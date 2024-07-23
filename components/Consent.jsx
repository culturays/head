'use client'
import React, { useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';

function Consent() {
  const [consent, setConsent] = useState(true);
  useEffect(() => {
    setConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setConsent(true);
    setCookie('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 });
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
    console.log('accepting cookies');
  };
  const closeP = () => {
    setConsent(true);
    console.log('');
  };
  const denyCookie = () => {
    setConsent(true);
    setCookie('localConsent', 'false', { maxAge: 60 * 60 * 24 * 365 });
    console.log('denying cookie');
  };
  if (consent === true) {
    return null;
  }

  const runConsent=()=>{
    if(window.__lxG__consent__!==undefined&&window.__lxG__consent__.getState()!==null){
      window.__lxG__consent__.showConsent()} 
      else {
        alert('This applies only to users from European Economic Area (EEA)')
      };
       return false
  } 
  return (
    <div className='consents w-full m-auto bg-gray-800 bg-opacity-50 mt-2 relative'> 
  <div
      className={`h-fit p-2 opacity-70 text-sm ${
        consent ? 'hidden' : ''
      }`}
    >
      <p className= "p-2 leading-normal opacity-80 text-sm" ><span>This site uses cookies.</span> By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. <a href="#" className='hover:text-red-300' onClick={runConsent}>Change privacy settings</a></p>
     
    </div>   
     <div className="text-center flex justify-around p-2">
        <button
        className="rounded-3xl bg-gray-800 text-yellow-600 hover:text-gray-300 p-2 w-32 font-bold"
          onClick={(e) => {
            closeP();
          }}
        >
          Close
        </button>
        <button
          onClick={(e) => denyCookie()}
          className="rounded-3xl bg-gray-800 text-yellow-600 hover:text-gray-300 p-2 w-32 font-bold"
        >
          Deny All
        </button>
        <button
          onClick={() => {
            acceptCookie();
          }}
          className="rounded-3xl bg-gray-800 text-yellow-600 hover:text-gray-300 p-2 w-32 font-bold"
        >
          Accept All
        </button>
      </div> 
      
      </div>
  );
}

export default Consent;