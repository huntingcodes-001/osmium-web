import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const products = [
    {
      name: 'SmartBoard AI Lite',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
      description: 'Entry-level smart board with essential AI features',
      price: '$999'
    },
    {
      name: 'SmartBoard AI Pro',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
      description: 'Professional-grade board with advanced AI capabilities',
      price: '$1,499'
    },
    {
      name: 'SmartBoard AI Enterprise',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
      description: 'Enterprise solution with full AI integration',
      price: '$1,999'
    },
    {
      name: 'SmartBoard AI Touch',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80',
      description: 'Enhanced touch sensitivity with AI features',
      price: '$1,299'
    },
    {
      name: 'SmartBoard AI Classroom',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80',
      description: 'Specifically designed for classroom environments',
      price: '$1,799'
    },
    {
      name: 'SmartBoard AI Mobile',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
      description: 'Portable smart board solution with AI capabilities',
      price: '$1,199'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Principal, Lincoln High School',
      content: 'SmartBoard AI has revolutionized how we teach. The AI features have made lessons more engaging and interactive.'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Department Head, Stanford University',
      content: 'The cost-effectiveness and advanced features make SmartBoard AI the perfect choice for our institution.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher, Elementary Education',
      content: "My students love the interactive features. It has made teaching so much more enjoyable and effective."
    }
  ];

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        toast.error(errorMessage);
        return;
      }

      console.log('Demo requested and data saved:', { name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
      toast.success("Demo request sent, we'll get back soon!");

    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why SmartBoard AI?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our AI-powered smart boards combine cutting-edge technology with affordability,
              making interactive learning accessible to all educational institutions.
              With features like gesture recognition, real-time collaboration, and
              intelligent content suggestions, we're revolutionizing the classroom experience.
            </p>
            <ul className="text-left space-y-4">
              <li className="flex items-center">
                <Check className="h-6 w-6 text-green-500 mr-2" />
                Advanced AI-powered features for enhanced learning
              </li>
              <li className="flex items-center">
                <Check className="h-6 w-6 text-green-500 mr-2" />
                Intuitive touch interface with multi-user support
              </li>
              <li className="flex items-center">
                <Check className="h-6 w-6 text-green-500 mr-2" />
                Cloud integration for seamless content sharing
              </li>
              <li className="flex items-center">
                <Check className="h-6 w-6 text-green-500 mr-2" />
                Cost-effective solutions for every budget
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8">Request a Demo</h2>
            <p className="text-lg mb-8">
              Ready to experience the future of interactive learning?
              Fill out the form below to request a personalized demo.
            </p>

            <form onSubmit={handleDemoRequest} className="space-y-6">
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Request Demo
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;