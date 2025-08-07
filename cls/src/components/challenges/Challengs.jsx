import React, { useEffect, useContext, useState } from 'react';
import { ChallengContext } from '../../context/challengContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Challengs() {
  const { challengs, generateChalenge } = useContext(ChallengContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const skillLevel = Array.isArray(user.skillLevel) ? user.skillLevel[0] : user.skillLevel || '';
    const preferredLanguage = Array.isArray(user.preferredLanguage) ? user.preferredLanguage[0] : user.preferredLanguage || '';

    const challengData = { skillLevel, preferredLanguage };

    generateChalenge(challengData);
    setTimeout(() => setIsLoaded(true), 500); // simulate slight delay for animation
  }, []);

  return (
    <div className="py-16 px-4">
      <h1 className='text-center text-5xl font-bold text-gray-800 drop-shadow-sm mb-10'> Today’s Challenge </h1>

      <AnimatePresence>
        {isLoaded && challengs && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl mx-auto bg-[#f7de8c] p-6 rounded-lg shadow-xl font-sans text-gray-800"
            onClick={()=> navigate(`/challengs/${challengs._id}`)}
          >
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">{challengs.title}</h2>
            <p className="text-lg leading-relaxed mb-6">{challengs.description}</p>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <span className="px-3 py-1 bg-blue-100 rounded-full">
                <strong>Language:</strong> {Array.isArray(challengs.preferredLanguage) ? challengs.preferredLanguage.join(', ') : challengs.preferredLanguage}
              </span>
              <span className="px-3 py-1 bg-green-100 rounded-full">
                <strong>Skill:</strong> {challengs.skillLevel}
              </span>
            </div>

            {challengs.progress && challengs.progress.length > 0 ? (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-3">📊 Your Progress</h3>
                <ul className="space-y-2 text-sm">
                  {challengs.progress.map((prog, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <p><strong>User:</strong> {prog.userId}</p>
                      <p><strong>Status:</strong> {prog.status}</p>
                      <p><strong>Submitted At:</strong> {prog.submittedAt ? new Date(prog.submittedAt).toLocaleString() : 'N/A'}</p>
                      {prog.solutionLink && (
                        <p>
                          <strong>Solution:</strong>{' '}
                          <a
                            href={prog.solutionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
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
              <p className="text-gray-400 italic">No progress yet. Start your challenge now!</p>
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
