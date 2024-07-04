import React from 'react';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import PopupForm from './components/PopupForm';
import './styles/index.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <PopupForm />
      <Footer />
    </div>
  );
}

export default App;
