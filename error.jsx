"use client"

import Link from "next/link";

const Error=({ error, reset })=> {
    return (
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <h1 className="font-black text-gray-200 text-9xl"> An Error has occured!</h1>
    
          <button
            type="button"
            onClick={() => reset()}
            className="inline-block px-5 py-3 m-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          ><a>
            Try Again
          </a>
          </button>
          <Link href='/'><button
            type="button"
            className="inline-block px-5 py-3 m-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          ><a>
            Go Back
          </a>
          </button></Link>
        </div>
      </div>
    );
  }

  export default Error