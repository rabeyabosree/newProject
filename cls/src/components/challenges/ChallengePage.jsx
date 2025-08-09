import React, { useEffect, useContext, useState } from 'react';
import { ChallengContext } from '../../context/challengContext';

function ChallengePage() {
  const { challengs, generateChalenge } = useContext(ChallengContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const skillLevel = Array.isArray(user.skillLevel) ? user.skillLevel[0] : user.skillLevel || '';
    const preferredLanguage = Array.isArray(user.preferredLanguage) ? user.preferredLanguage[0] : user.preferredLanguage || '';

    const challengData = { skillLevel, preferredLanguage };

    generateChalenge(challengData).then(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading challenge...</p>;

  if (!challengs || !challengs.title)
    return <p className="text-center mt-10 text-red-500">No challenge found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{challengs.title}</h1>

      <div className="flex flex-wrap gap-6 mb-6 text-gray-600 text-sm">
        <span>
          <strong>Day:</strong> {challengs.dayNumber}
        </span>
        <span>
          <strong>Skill Level:</strong> {challengs.skillLevel}
        </span>
        <span>
          <strong>Language:</strong> {challengs.preferredLanguage}
        </span>
        <span>
          <strong>Estimated Time:</strong> {challengs.estimatedTime}
        </span>
      </div>

      <p className="text-lg leading-relaxed mb-8">{challengs.description}</p>

      {challengs.progress && challengs.progress.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-md text-gray-700">
          <h3 className="text-xl font-semibold mb-3">Progress:</h3>
          <ul className="list-disc list-inside space-y-2">
            {challengs.progress.map((prog, index) => (
              <li key={index}>
                <span className="font-medium">User:</span> {prog.userId} —{' '}
                <span className="font-medium">Status:</span> {prog.status} —{' '}
                <span className="font-medium">Submitted At:</span>{' '}
                {prog.submittedAt
                  ? new Date(prog.submittedAt).toLocaleString()
                  : 'N/A'}
                {prog.solutionLink && (
                  <div>
                    <span className="font-medium">Solution:</span>{' '}
                    <a
                      href={prog.solutionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {prog.solutionLink}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChallengePage;
