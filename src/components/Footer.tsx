import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SmartBoard AI</h3>
            <p className="text-sm sm:text-base text-gray-400">Revolutionizing education with AI-powered smart boards at affordable prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-400">
              <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@smartboardai.com</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567</p>
              <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Silicon Valley, CA</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm sm:text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} SmartBoard AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;