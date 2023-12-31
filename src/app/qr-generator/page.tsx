'use client'
// pages/index.js
// src/app/page.tsx

import React, {useState} from 'react';
import QRCode from 'qrcode.react';
import Head from 'next/head';
import {FaGlobe, FaAddressCard, FaDownload, FaInstagram, FaWhatsapp} from 'react-icons/fa';
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import Link from 'next/link';

const defaultColors = ['#00449E', // Rich Blue
    '#357EDD', // Soft Blue
    '#F2355B', // Vibrant Pink
    '#FFB700', // Bright Yellow
    '#00C875', // Green
    '#FF6900', // Orange
    '#ABB8C3', // Light Gray
    '#000000', // Black
    '#FFFFFF', // White
];

export default function Home(){ 
	const defaultQRValue = "Welcome to QR Code Generator"; // Set your default QR code value here
    const [inputData, setInputData] = useState({
        type: 'URL',
        url: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        company: '',
        website: '',
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
		    whatsapp: '', // new WhatsApp field
    instagram: '', // new Instagram field
    });
	    // New state for input errors
    const [inputErrors, setInputErrors] = useState({
        email: '',
        phone: '',
		firstName: '',
    });

	const [selectedForegroundColor, setSelectedForegroundColor] = useState(inputData.foregroundColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(inputData.backgroundColor);
	
	
    // Validate email format
    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };
    const [qrValue, setQrValue] = useState(defaultQRValue);

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
		        // Validation logic
        if (name === 'firstName' && !value.trim()) {
            setInputErrors({ ...inputErrors, firstName: 'First name is required' });
        } else if (name === 'email' && value && !validateEmail(value)) {
            setInputErrors({ ...inputErrors, email: 'Invalid email format' });
        } else if (name === 'phone' && !value.trim()) {
            setInputErrors({ ...inputErrors, phone: 'Phone number is required' });
        }
        setInputData(prevData => ({ ...prevData, [name]: value }));
		
        // Update the QR code live based on the type of input
        if (inputData.type === 'URL' && value) {
            setQrValue(value); // Update QR code for URL
        } else if (inputData.type === 'vCard') {
			    setTimeout(() => {
                const vCardString = `BEGIN:VCARD\nVERSION:3.0\nFN:${inputData.firstName} ${inputData.lastName}\nTEL:${inputData.phone}\nEMAIL:${inputData.email}\nORG:${inputData.company}\nEND:VCARD`;
                setQrValue(vCardString);
            }, 500);
        } else if (inputData.type === 'WhatsApp' && name === 'whatsapp') {
        setQrValue(`https://wa.me/${value}`); // Format for WhatsApp links
    } else if (inputData.type === 'Instagram' && name === 'instagram') {
        setQrValue(`https://instagram.com/${value}`); // Format for Instagram profile links
    } 
		else {
            setQrValue(defaultQRValue); // Reset to default if input is cleared
        }
    };

      
    const handleSelectType = (type: string) => {
        setInputData({
            ...inputData,
            type
        });
        setQrValue('');
    };

    const generateQRCode = () => {
        if (inputData.type === 'URL') {
            setQrValue(inputData.url);
        } else if (inputData.type === 'vCard') {
            const vCardString = `BEGIN:VCARD\nVERSION:3.0\nFN:${inputData.firstName} ${inputData.lastName}\nTEL:${inputData.phone}\nEMAIL:${inputData.email}\nORG:${inputData.company}\nURL:${inputData.website}\nEND:VCARD`;
            setQrValue(vCardString);
        }
    };
	
const downloadQRCode = (qrValue: string) => {
    // Assuming qrCodeElement is obtained via document.querySelector or similar
    const qrCodeElement = document.querySelector('canvas') as HTMLCanvasElement;

    // Check if qrCodeElement is not null
    if (qrCodeElement) {
        // Continue with your logic if qrCodeElement is not null
        const downloadLink = document.createElement('a');
        downloadLink.href = qrCodeElement.toDataURL('image/png');
        downloadLink.download = 'qr-code.png'; // File name for download

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        // Handle the case where qrCodeElement is null
        console.error('QR Code element not found');
    }
};
	
const renderVCardForm = () => {
    return (
        <div className="space-y-3">
            {/* Row 1: First Name and Last Name */}
            <div className="flex space-x-3">
                <div className="flex-1">
                    <Label htmlFor="firstName" className="text-gray-700">
                        First Name
                    </Label>
                    <Input 
                        id="firstName" 
                        name="firstName" 
                        placeholder="John" 
                        value={inputData.firstName} 
                        onChange={handleInputChange}
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50" 
                        required 
                        type="text" 
                    />
                    {inputErrors.firstName && <p className="text-red-500 text-xs">{inputErrors.firstName}</p>}
                </div>
                <div className="flex-1">
                    <Label htmlFor="lastName" className="text-gray-700">
                        Last Name
                    </Label>
                    <Input 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Doe" 
                        value={inputData.lastName} 
                        onChange={handleInputChange} 
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                        required 
                        type="text" 
                    />
                </div>
            </div>

            {/* Row 2: Phone and Email */}
            <div className="flex space-x-3">
                <div className="flex-1">
                    <Label htmlFor="phone" className="text-gray-700">
                        Phone
                    </Label>
                    <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="+1 234 567 8900" 
                        value={inputData.phone} 
                        onChange={handleInputChange} 
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
						required  // Add this line
        type="tel"  // Specify the type as "tel" for phone numbers
                    />
                    {inputErrors.phone && <p className="text-red-500 text-xs">{inputErrors.phone}</p>}
                </div>
                <div className="flex-1">
                    <Label htmlFor="email" className="text-gray-700">
                        Email
                    </Label>
                    <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="example@email.com" 
                        value={inputData.email} 
                        onChange={handleInputChange} 
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
						required  // Add this line
                    />
                    {inputErrors.email && <p className="text-red-500 text-xs">{inputErrors.email}</p>}
                </div>
            </div>

            {/* Row 3: Company and Website */}
            <div className="flex space-x-3">
                <div className="flex-1">
                    <Label htmlFor="company" className="text-gray-700">
                        Company
                    </Label>
                    <Input
						type="company"
                        id="company" 
                        name="company" 
                        placeholder="Company Name" 
                        value={inputData.company} 
                        onChange={handleInputChange} 
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
						required  // Add this line						
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="website" className="text-gray-700">
                        Website
                    </Label>
                    <Input
						type="website"
                        id="website" 
                        name="website" 
                        placeholder="https://example.com" 
                        value={inputData.website} 
                        onChange={handleInputChange} 
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
						required  // Add this line
                    />
                </div>
            </div>
        </div>
    );
};

	

const handleColorChange = (color: string, isForeground = true) => {
  setInputData(prevData => ({
    ...prevData,
    ...(isForeground ? { foregroundColor: color } : { backgroundColor: color }),
  }));
  if (isForeground) {
    setSelectedForegroundColor(color);
  } else {
    setSelectedBackgroundColor(color);
  }
};


const renderColorPicker = (isForeground = true) => {
  const selectedColor = isForeground ? selectedForegroundColor : selectedBackgroundColor;
  return (
    <div className="flex space-x-2">
      {defaultColors.map(color => (
        <div 
          key={color}
          className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color === selectedColor ? 'ring-2 ring-offset-2 ring-blue-500 border-transparent' : 'border-gray-200'}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color, isForeground)}
        />
      ))}
    </div>
  );
};

  
    const renderStep1 = () => {
        return (
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Step 1: Choose Option</h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100 text-gray-700" onClick={() => handleSelectType('URL')}>
                        <FaGlobe className="mr-2" /> URL
                    </button>
                    <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-100 text-gray-700" onClick={() => handleSelectType('vCard')}>
                        <FaAddressCard className="mr-2" /> vCard
                    </button>
                </div>
            </div>
        );
    };

  const renderStep2 = () => {
    switch (inputData.type) {
      case 'URL':
        return <Input id="url" name="url" placeholder="Enter URL" value={inputData.url} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required type="url" />;
      case 'vCard':
        return renderVCardForm();
      case 'WhatsApp':
        return <Input id="whatsapp" name="whatsapp" placeholder="Enter WhatsApp number" value={inputData.whatsapp} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required type="tel" />;
      case 'Instagram':
        return <Input id="instagram" name="instagram" placeholder="Enter Instagram URL" value={inputData.instagram} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" required type="url" />;
      // Add more cases if needed
      default:
        return null;
    }
  };

    const renderStep3 = () => {
        return (
            <div>
				<h2 className="text-base sm:text-lg font-semibold mb-2">Step 3: Select Color</h2>
                <div className="mb-2">
                    <div className="font-semibold">Foreground Color:</div>
                    {renderColorPicker()}
                </div>
                <div>
                    <div className="font-semibold">Background Color:</div>
                    {renderColorPicker(false)}
                </div>
            </div>
        );
    };
	
	return (
	<div key="1" className="container bg-white mx-auto px-4 relative">
      <header className="flex justify-between items-center py-4">
        <Link href="../" passHref>
		<button className="text-2xl text-gray-600 font-bold">QReator</button>
		</Link>
        <nav>
          <ul className="hidden sm:flex space-x-4">
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
	  
        <Head>
            <title>QR Code Generator</title>
            <meta name="description" content="Generate your QR code" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow">
			<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Design</h1>
                {/* Step 1: Choose Option */}
               <div className="mb-4">
  <h2 className="text-sm md:text-base font-semibold mb-2 text-gray-800">1) Choose Option</h2>
  <div className="flex justify-start items-center space-x-4">
<button
  className={`flex items-center px-4 py-2 border rounded 
              ${inputData.type === 'URL' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
  onClick={() => handleSelectType('URL')}>
  <FaGlobe className="mr-2" /> URL
</button>
    <button
  className={`flex items-center px-4 py-2 border rounded 
              ${inputData.type === 'vCard' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
      onClick={() => handleSelectType('vCard')}>
	  <FaAddressCard className="mr-2" /> vCard
    </button>
	    <button
  className={`flex items-center px-4 py-2 border rounded 
              ${inputData.type === 'WhatsApp' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
      onClick={() => handleSelectType('WhatsApp')}>
	  <FaWhatsapp className="mr-2" /> WhatsApp
    </button>
	    <button
  className={`flex items-center px-4 py-2 border rounded 
              ${inputData.type === 'Instagram' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
      onClick={() => handleSelectType('Instagram')}>
	  <FaInstagram className="mr-2" /> Instagram
    </button>
  </div>
</div>

 {/* Step 2: Enter Details */}
                    <div className="mb-8">
                        {renderStep2()}
                    </div>

                {/* Step 3: Select Color */}
                <div>
                    <h2 className="text-sm md:text-base font-semibold mb-2 text-gray-800">3) Select Color</h2>
                    <div className="mb-2">
                        <div className="text-base mb-2 text-gray-800">Foreground Color:</div>
                        {renderColorPicker(true)}
                    </div>
                    <div>
                        <div className="text-base mb-2 text-gray-800">Background Color:</div>
                        {renderColorPicker(false)}
                    </div>
                </div>
            </div>

            {/* Right Pane: QR Code Display Section */}
            <div className="md:w-1/2 p-4 bg-white rounded-lg shadow">
                <div className="text-lg md:text-2xl font-bold text-center mb-8 text-gray-800">QR Code</div>
                <div className="flex flex-col items-center justify-center">
                    {qrValue && (
                        <>
                            <QRCode value={qrValue} size={256} fgColor={inputData.foregroundColor} bgColor={inputData.backgroundColor} />
							<button className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" onClick={() => downloadQRCode(qrValue)}>
                                <FaDownload className="mr-2" /> Download
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
	      <footer className="border-t py-4 text-center text-gray-800">
        <span>© QReator - Your simple QR solution.</span>
      </footer>
	</div>
);
}
