'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import Modal from './components/ui/Modal'; // Import the modal component
import YourFormComponent from './components/ui/YourFormComponent'; // Your form component

interface ArrowRightIconProps {
  [key: string]: any;
}

function ArrowRightIcon(props: ArrowRightIconProps) {
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
  );
}

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <div key="1" className="container bg-white mx-auto px-4 relative">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl text-gray-600 font-bold">QR Code Builder</h1>
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
                <a
                  className="text-base font-medium font-bold text-gray-600 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md transition duration-300 ease-in-out"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                >
                  Sign up
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="text-center mt-20 relative">
        <h2 className="text-5xl text-gray-800 font-extrabold">
          The
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 animate-hue animate-pulse">
            {' quickest '}
          </span>
          way to build QR codes
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 animate-hue">
            {' (for free!) '}
          </span>
        </h2>
        <p className="mt-6 text-xl text-gray-700">
          Build QR codes in seconds. Meet QR Code Builder — the free, simple QR generator you have been looking for.
        </p>
        <Link href="/qr-generator">
          <button className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded inline-flex items-center" type="button" > Build QR Code
            <ArrowRightIcon className="ml-2" />
          </button>
        </Link>
        <p className="mt-4 text-sm font-semibold text-gray-500">No signup required</p>
        <div className="mt-10">
        </div>
      </main>
        <Analytics />
      </div>

      {/* Modal with Form */}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <YourFormComponent />
      </Modal>
    </div>
  );
}
