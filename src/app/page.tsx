
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lgqGnZeOkk2
 */
import React from 'react';
import Link from 'next/link';
import Button from './components/ui/Button';

export default function Component() {
  return (
  <div className="bg-white min-h-screen">
    <div key="1" className="container bg-white mx-auto px-4 relative">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl text-gray-600 font-bold">QReator</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link className="text-base text-gray-600 hover:text-gray-800" href="#">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="text-base text-gray-600 hover:text-gray-800" href="#">
                Log in
              </Link>
            </li>
            <li>
              <Link className="text-base text-gray-600 hover:text-gray-800" href="#">
                Sign up
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </header>
      <main className="text-center mt-20 relative">
        <h2 className="text-5xl text-gray-800 font-extrabold">
          Creating QR codes made  
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 animate-hue animate-pulse">
            {' easy & free '}
          </span>
        </h2>
        <p className="mt-6 text-xl text-gray-700">
          Say goodbye to complex QR codes. Meet QReator — the free, simple QR builder you have been looking for.
        </p>
        <Link href="/qr-generator">
          <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded inline-flex items-center" type="button" >
            <ArrowRightIcon className="ml-2" />
          </button>
        </Link>
        <p className="mt-4 text-sm text-gray-500">No signup required</p>
        <div className="mt-10">
        </div>
      </main>
    </div>
	</div>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
