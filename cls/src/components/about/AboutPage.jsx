import React from 'react';
import teamImage from '../../assets/developerTeam.webp';

function AboutPage() {
  return (
    <div className="bg-[#CAE4DB] text-[#DCAE1D] px-4 py-[100px]">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div className="text-center px-2 mb-13">
          <h1 className="text-2xl sm:text-3xl font-semibold">About This Platform</h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">

           {/* Team Image */}
          <div className="flex-1 text-center px-2">
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full max-w-xs sm:max-w-md mx-auto rounded-md shadow-sm"
            />
          </div>
          
          {/* Description */}
          <div className="flex-1 text-sm sm:text-base leading-relaxed text-gray-700 space-y-3 px-2">
            <p>
              This platform is built for those who want to improve through daily practice.
              You'll receive one challenge each day, tailored to your skill level and preferred language.
            </p>
            <p>
              Our goal is to help you build strong habits by solving real-world problems — 
              no overwhelming tutorials or scattered content.
            </p>
            <p className="text-center font-medium mt-6">
              Progress comes from daily effort.
            </p>
          </div>

         
        </div>

      </div>
    </div>
  );
}

export default AboutPage;








