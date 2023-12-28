'use client'
// pages/index.js
// src/app/page.tsx


import React, {
    useState
} from 'react';
import QRCode from 'qrcode.react';
import Head from 'next/head';
import {
    FaGlobe,
    FaAddressCard,
    FaDownload
} from 'react-icons/fa';
import Label from './components/ui/Label';
import Button from './components/ui/Button';
import Input from './components/ui/Input';


const defaultColors = [
    '#00449E', // Rich Blue
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
        } else {
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
                <div className="flex justify-start items-center space-x-4">
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
        return (
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Step 2: Input Form</h2>
                {inputData.type === 'vCard' ? renderVCardForm() : (
                            <Input 
            id="url" 
            name="url" 
            placeholder="Enter URL" 
            value={inputData.url} 
            onChange={handleInputChange} 
            className="w-full p-2 border border-gray-300 rounded-lg"
            required={true}  // assuming it's a required field
            type="url"  // specify the type as 'url'
        />
                )}
            </div>
        );
    };

    const renderStep3 = () => {
        return (
            <div>
                <h2 className="text-lg font-semibold mb-2">Step 3: Select Color</h2>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-roboto">
        <Head>
            <title>QR Code Generator</title>
            <meta name="description" content="Generate your QR code" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
            <div className="w-1/2 p-4 bg-white rounded-lg shadow">
			<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Design</h1>
                {/* Step 1: Choose Option */}
                <div className="mb-8">
                    <h2 className="text-sm md:text-base font-semibold mb-2 text-gray-800">1) Choose Option</h2>
                    <div className="flex justify-start items-center space-x-4">
                        <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-200 transition duration-300 text-gray-700" onClick={() => handleSelectType('URL')}>
                            <FaGlobe className="mr-2" /> URL
                        </button>
                        <button className="flex items-center px-4 py-2 border rounded hover:bg-gray-200 transition duration-300 text-gray-700" onClick={() => handleSelectType('vCard')}>
                            <FaAddressCard className="mr-2" /> vCard
                        </button>
                    </div>
                </div>

                {/* Step 2: Enter Details */}
                <div className="mb-8">
                    <h2 className="text-sm md:text-base font-semibold mb-2 text-gray-800">2) Input Form</h2>
                    {inputData.type === 'vCard' ? renderVCardForm() : (
						<input id="url" name="url" placeholder="Enter URL" value={inputData.url} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    )}
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
    </div>
);
}
