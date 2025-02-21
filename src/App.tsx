import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';  // Make sure Contact is imported

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactWithFormHandler />} /> {/* Use the wrapped component */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


// Wrap the Contact component with a form handler
const ContactWithFormHandler = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse JSON error
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setFormData({ name: '', email: '', phone: '', message: '' });
      if (formRef.current) {
        formRef.current.reset();
      }
      alert('Message sent successfully!');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return <Contact 
    formData={formData} 
    handleChange={handleChange} 
    handleSubmit={handleSubmit} 
    formRef={formRef} 
  />;
};



export default App;