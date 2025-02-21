import React from 'react';

const About = () => {
  const founders = [
    {
      name: 'John Smith',
      role: 'CEO & Co-founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      bio: 'Former Google AI researcher with 15 years of experience in EdTech.'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      bio: 'AI specialist with multiple patents in interactive display technology.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'COO & Co-founder',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80',
      bio: 'Education technology expert with 20 years of industry experience.'
    },
    {
      name: 'Emily Taylor',
      role: 'Head of Product & Co-founder',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      bio: 'Former educator turned product strategist specializing in EdTech.'
    }
  ];

  const mentors = [
    {
      name: 'Dr. David Chang',
      role: 'AI Research Advisor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      bio: 'Professor of AI at MIT, pioneering researcher in educational technology.'
    },
    {
      name: 'Prof. Lisa Anderson',
      role: 'Education Strategy Advisor',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80',
      bio: 'Harvard Education School Dean, expert in modern learning methodologies.'
    },
    {
      name: 'Robert Martinez',
      role: 'Technology Advisor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      bio: 'Former CTO of leading EdTech companies, technology innovation expert.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Company Overview */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">About SmartBoard AI</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Founded in 2023, SmartBoard AI is revolutionizing education through
              affordable, AI-powered interactive displays. Our mission is to make
              advanced educational technology accessible to all institutions,
              regardless of their budget constraints.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              We combine cutting-edge artificial intelligence with intuitive
              hardware design to create smart boards that enhance the learning
              experience while remaining cost-effective. Our team of educators,
              technologists, and AI experts works tirelessly to push the
              boundaries of what's possible in educational technology.
            </p>
          </div>
        </div>
      </section>

      {/* Co-founders */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Co-founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className="text-center">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-32 sm:w-48 h-32 sm:h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{founder.name}</h3>
                <p className="text-blue-600 mb-2">{founder.role}</p>
                <p className="text-sm sm:text-base text-gray-600">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Mentors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{mentor.name}</h3>
                <p className="text-blue-600 mb-2 text-center">{mentor.role}</p>
                <p className="text-sm sm:text-base text-gray-600 text-center">{mentor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;