import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';

function Profile() {
  const { userProfile, profileData, updateUserProfile
  } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState([]);
  const [skillLevel, setSkillLevel] = useState('');
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    userProfile()
  }, [])

  const handleCheckboxChange = (lang) => {
    setPreferredLanguage((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };
  
 const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('skillLevel', skillLevel);
    preferredLanguage.forEach((lang) =>
      formData.append('preferredLanguage', lang)
    );
    if (profileImg) {
      formData.append('profileImg', profileImg);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]); // ✅ Proper log
    }

    await updateUserProfile(formData); // ✅ Directly send formData
    await userProfile();               // ✅ Refresh updated data
    setEditMode(false);
    console.log("User updated successfully");
  } catch (error) {
    console.error("Update error:", error);
    alert('Failed to update profile: ' + (error.message || error));
  }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              profileImg
                ? URL.createObjectURL(profileImg)
                : profileData?.profileImg ||
                'https://www.vecteezy.com/vector-art/5544718-profile-icon-design-vector'
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500"
          />

          {editMode ? (
            <>
              <input
                type="file"
                accept="profileImg/*"
                onChange={(e) => setProfileImg(e.target.files[0])}
                className="mb-4"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Your bio..."
                className="w-full p-2 border rounded mb-3"
              />

              <div className="text-left w-full mb-4">
                <p className="font-medium mb-1">Preferred Languages</p>
                <div className="flex flex-wrap gap-4">
                  {['JavaScript', 'Python', 'C++'].map((lang) => (
                    <label key={lang} className="inline-flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferredLanguage.includes(lang)}
                        onChange={() => handleCheckboxChange(lang)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-left w-full mb-6">
                <p className="font-medium mb-1">Skill Level</p>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{profileData?.name || 'User'}</h1>
              <h2 className="text-gray-600 mb-1">{profileData?.email || 'No Email'}</h2>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Languages:</strong>{' '}
                {Array.isArray(profileData?.preferredLanguage)
                  ? profileData.preferredLanguage.join(', ')
                  : 'Not Set'}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Skill Level:</strong>{' '}
                {Array.isArray(profileData?.skillLevel)
                  ? profileData.skillLevel[0]
                  : profileData?.skillLevel || 'Beginner'}
              </p>
              <p className="text-gray-700 mt-4">{profileData?.bio || 'No bio'}</p>

              <button
                onClick={() => setEditMode(true)}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;




