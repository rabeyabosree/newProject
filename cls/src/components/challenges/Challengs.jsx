import React, { useEffect, useContext, useState } from 'react';
import { ChallengContext } from '../../context/challengContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Challengs() {
  const { challengs, generateChalenge } = useContext(ChallengContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const skillLevel = Array.isArray(user.skillLevel) ? user.skillLevel[0] : user.skillLevel || '';
    const preferredLanguage = Array.isArray(user.preferredLanguage) ? user.preferredLanguage[0] : user.preferredLanguage || '';

    const challengData = { skillLevel, preferredLanguage };

    generateChalenge(challengData);
    setTimeout(() => setIsLoaded(true), 500); // simulate slight delay for animation
  }, []);

  return (
    <div className="py-16 px-6 mt-10 ">
      <h1 className="text-center text-5xl font-extrabold text-gray-900 drop-shadow-md mb-12 select-none">
        Today’s Challenge
      </h1>

      <AnimatePresence>
        {isLoaded && challengs && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
            onClick={() => navigate(`/challengs/${challengs._id}`)}
          >
            <h2 className="text-4xl font-semibold text-blue-700 mb-5 tracking-tight">{challengs.title}</h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-700">{challengs.description}</p>

            <div className="flex flex-wrap gap-4 mb-8 text-sm font-medium text-gray-700">
              <span className="px-4 py-2 bg-blue-200 rounded-full shadow-inner select-none">
                <strong>Language:</strong>{' '}
                {Array.isArray(challengs.preferredLanguage)
                  ? challengs.preferredLanguage.join(', ')
                  : challengs.preferredLanguage}
              </span>
              <span className="px-4 py-2 bg-green-200 rounded-full shadow-inner select-none">
                <strong>Skill:</strong> {challengs.skillLevel}
              </span>
            </div>

            {challengs.progress && challengs.progress.length > 0 ? (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-inner">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                  <span role="img" aria-label="chart">📊</span> Your Progress
                </h3>
                <ul className="space-y-4 text-gray-800">
                  {challengs.progress.map((prog, idx) => (
                    <li
                      key={idx}
                      className="border-b border-gray-300 pb-3 last:border-0 last:pb-0"
                    >
                      <p><strong>User:</strong> {prog.userId}</p>
                      <p><strong>Status:</strong> <span className={`font-semibold ${prog.status === 'Completed' ? 'text-green-600' : prog.status === 'In Progress' ? 'text-yellow-600' : 'text-gray-500'}`}>{prog.status}</span></p>
                      <p><strong>Submitted At:</strong> {prog.submittedAt ? new Date(prog.submittedAt).toLocaleString() : 'N/A'}</p>
                      {prog.solutionLink && (
                        <p className="truncate max-w-full">
                          <strong>Solution:</strong>{' '}
                          <a
                            href={prog.solutionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {prog.solutionLink}
                          </a>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="italic text-gray-500 text-center mt-8 select-none">
                 Start your challenge now!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Challengs;




//  <span><strong>Day:</strong> {challengs.dayNumber}</span>
//         <span><strong>Estimated Time:</strong> {challengs.estimatedTime}</span>
