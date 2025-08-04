import React, { useEffect, useContext } from 'react';
import { ChallengContext } from '../../context/challengContext';

function Challengs() {
  const { challengs, generateChalenge } = useContext(ChallengContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const skillLevel = Array.isArray(user.skillLevel) ? user.skillLevel[0] : user.skillLevel || '';
    const preferredLanguage = Array.isArray(user.preferredLanguage) ? user.preferredLanguage[0] : user.preferredLanguage || '';

    const challengData = { skillLevel, preferredLanguage };

    generateChalenge(challengData);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{challengs.title}</h1>

      <p className="mb-6 text-lg leading-relaxed">{challengs.description}</p>

      <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-6">
        <span><strong>Day:</strong> {challengs.dayNumber}</span>
        <span><strong>Estimated Time:</strong> {challengs.estimatedTime}</span>
        <span><strong>Language:</strong> {Array.isArray(challengs.preferredLanguage) ? challengs.preferredLanguage.join(', ') : challengs.preferredLanguage}</span>
        <span><strong>Skill Level:</strong> {challengs.skillLevel}</span>
      </div>

      {challengs.progress && challengs.progress.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-md text-gray-700">
          <h3 className="text-xl font-semibold mb-3">Progress</h3>
          <ul className="list-disc list-inside space-y-2">
            {challengs.progress.map((prog, idx) => (
              <li key={idx}>
                <span className="font-medium">User:</span> {prog.userId} - <span className="font-medium">Status:</span> {prog.status} - <span className="font-medium">Submitted At:</span> {prog.submittedAt ? new Date(prog.submittedAt).toLocaleString() : 'N/A'}
                {prog.solutionLink && (
                  <div>
                    <span className="font-medium">Solution:</span> <a href={prog.solutionLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{prog.solutionLink}</a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!challengs.progress || challengs.progress.length === 0 ? (
        <p className="text-gray-500 italic">No progress available yet.</p>
      ) : null}
    </div>
  );
}

export default Challengs;
