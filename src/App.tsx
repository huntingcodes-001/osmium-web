import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

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
            <Route path="/contact" element={<ContactWithFormHandler />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

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
        const contentType = response.headers.get('content-type');
        let errorMessage = "An error occurred. Please try again.";

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
          } catch (jsonError) {
            console.error("Error parsing JSON error response:", jsonError);
          }
        } else {
          const errorText = await response.text();
          errorMessage = `Server error: ${response.status} - ${errorText}`;
        }
        toast.error(errorMessage); // Toast for error
        return; // Stop further execution in case of error
      }

      setFormData({ name: '', email: '', phone: '', message: '' });
      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Message sent successfully!"); // Toast for success

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again."); // Toast for fetch error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <> {/* Fragment to wrap Contact and ToastContainer */}
      <Contact
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formRef={formRef}
      />
      <ToastContainer /> {/* Add ToastContainer */}
    </>
  );
};

export default App;