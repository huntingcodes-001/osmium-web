import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AnalyticsWrapper> {/* AnalyticsWrapper is INSIDE the Router */}
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
        <ToastContainer /> {/* ToastContainer here so toasts appear on all pages */}
      </AnalyticsWrapper>
    </Router>
  );
}

const ContactWithFormHandler = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        toast.error(errorMessage);
        return;
      }

      setFormData({ name: '', email: '', phone: '', message: '' });
      if (formRef.current) {
        formRef.current.reset();
      }
      toast.success("Message sent successfully!");

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Contact
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formRef={formRef}
    />
  );
};

const AnalyticsWrapper = ({ children }: { children: JSX.Element }) => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [entryTime, setEntryTime] = useState(null);
  const [exitTime, setExitTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const getUserData = async (isInitialVisit = false) => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const geoData = await geoResponse.json();

        const userAgent = navigator.userAgent;
        const screenResolution = `${window.screen.width}x${window.screen.height}`;

        const currentPage = location.pathname;
        const currentTime = new Date().toISOString();

        const data = {
          serverTimestamp: currentTime,
          userTime: new Date().toLocaleString(),
          ip: ipAddress,
          deviceType: getDeviceType(userAgent),
          os: getOS(userAgent),
          screenResolution: screenResolution,
          geolocation: geoData,
          referralSource: document.referrer || "Direct Visit",
          currentPage: currentPage,
          isInitialVisit: isInitialVisit,
          entryTime: entryTime || currentTime,
          exitTime: exitTime,
          duration: duration,
        };

        setUserData(data);

        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

      } catch (error) {
        console.error("Error collecting user data:", error);
      }
    };

    const handleInitialVisit = () => {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        getUserData(true);
        localStorage.setItem('hasVisited', 'true');
      } else {
        getUserData();
      }
    };

    handleInitialVisit();

  }, [location]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setEntryTime(new Date().toISOString());

    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTimeRef.current) / 60000);
      setExitTime(new Date().toISOString());
      setDuration(timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const getDeviceType = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile')) return 'Mobile';
    if (ua.includes('tablet')) return 'Tablet';
    return 'Desktop';
  };

  const getOS = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('windows')) return 'Windows';
    if (ua.includes('mac')) return 'macOS';
    if (ua.includes('linux')) return 'Linux';
    if (ua.includes('android')) return 'Android';
    if (ua.includes('ios')) return 'iOS';
    return 'Unknown';
  };

  return <>{children}</>;
};

export default App; // No need for WrappedApp anymore