import React from 'react';
import Input from './Input'; // Adjust the relative path as necessary
import Label from './Label';
import Button from './Button';
import Card from './Card';
import CardContent from './CardContent';
import CardHeader from './CardHeader'; // Adjust the path as necessary
import Textarea from './Textarea';

const YourFormComponent: React.FC = () => {
  // Assuming you have a state to store form data
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Add a function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Further processing...
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-white mb-1"> - </h2>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
        <p className="text-center text-sm text-gray-600 mb-2">
          Be the first to learn about our new features and updates!
        </p>
        <CardContent className="p-3">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />  
            </div>
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
              <Textarea
        id="message"
        name="message"
        placeholder="Any feedback or what features would you like"
        value={formData.message}
        onChange={handleInputChange}
        required
              />
            </div>
            {/* <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourFormComponent;
