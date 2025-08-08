import React from 'react';
import heroImg from '../../assets/6262451-removebg-preview.png'
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate()
  return (
    <div className="h-screen flex items-center justify-center overflow-auto px-6 sm:px-12 bg-[#CAE4DB]">
      <div className="max-w-5xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#00303F] leading-tight mb-4">
            Welcome to <span className="text-[#DCAE1D]">Your Awesome App</span>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-6">
            Build fast. Scale smart. Impress users. Start your journey today with our tools and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={()=> navigate("/register") } className="bg-[#00303F] text-white px-6 py-3 rounded-xl text-base hover:text-[#abb4d1] transition">
              Get Started
            </button>
            <button className="border border-[#00303F] text-[#00303F] px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
