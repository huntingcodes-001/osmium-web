import React from 'react';
import { ArrowRight, Brain, Zap, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Transform Education with AI-Powered Smart Boards
              </h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">
                Affordable, intelligent, and interactive solutions for modern classrooms
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
                alt="Modern Classroom"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose SmartBoard AI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">Advanced artificial intelligence enhances teaching and learning experiences.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
              <p className="text-gray-600">Engage students with intuitive and responsive touch technology.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
              <p className="text-gray-600">Premium features at an affordable price point for all institutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Ready to Transform Your Classroom?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 sm:px-8 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;