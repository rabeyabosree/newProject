import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';

function Profile() {
  const { userProfile, profileData, updateUserProfile } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState([]);
  const [skillLevel, setSkillLevel] = useState('');
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    userProfile();
  }, []);

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

      await updateUserProfile(formData);
      await userProfile();
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      alert('Failed to update profile: ' + (error.message || error));
    }
  };

  return (
 <div className='flex items-center justify-center h-screen'>
  <div className='flex justify-between items-start gap-[90px]'>
    {/** left part */}
   <div>
     <img
               src={
                 profileImg
                   ? URL.createObjectURL(profileImg)
                  : profileData?.profileImg ||
                    'https://www.vecteezy.com/vector-art/5544718-profile-icon-design-vector'}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover mb-4 bg-gray-100"
           />
   </div>

{/** right part */}
   <div>
    <h2 className="text-xl font-bold text-gray-800 mt-5">{profileData?.name || 'User'}</h2>
    <p className="text-sm text-gray-500 mt-4">{profileData?.email || 'No Email'}</p>
   </div>

   <hr className='w-full h-1 text-amber-200' />
  </div>
 </div>
  );
}

export default Profile;



  // <div className="min-h-screen flex justify-center items-center px-4 py-10">
  //     <div className="w-full max-w-4xl overflow-hidden">
       
         
  //         <div className="flex flex-col justify-center items-center p-6">
  //           <img
  //             src={
  //               profileImg
  //                 ? URL.createObjectURL(profileImg)
  //                 : profileData?.profileImg ||
  //                   'https://www.vecteezy.com/vector-art/5544718-profile-icon-design-vector'
  //             }
  //             alt="profile"
  //             className="w-32 h-32 rounded-full object-cover mb-4"
  //           />
  //           <h2 className="text-xl font-bold text-gray-800 mb-1">{profileData?.name || 'User'}</h2>
  //           <p className="text-sm text-gray-500">{profileData?.email || 'No Email'}</p>
  //           {!editMode && (
  //             <button
  //               onClick={() => setEditMode(true)}
  //               className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
  //             >
  //               Edit Profile
  //             </button>
  //           )}
  //         </div>

          
  //         <div className="lg:col-span-2 p-6">
  //           {editMode ? (
  //             <>
  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium mb-1">Profile Image</label>
  //                 <input
  //                   type="file"
  //                   accept="image/*"
  //                   onChange={(e) => setProfileImg(e.target.files[0])}
  //                   className="w-full text-sm"
  //                 />
  //               </div>

  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium mb-1">Bio</label>
  //                 <textarea
  //                   value={bio}
  //                   onChange={(e) => setBio(e.target.value)}
  //                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
  //                   rows={4}
  //                 />
  //               </div>

  //               <div className="mb-4">
  //                 <label className="block text-sm font-medium mb-2">Preferred Languages</label>
  //                 <div className="flex flex-wrap gap-4">
  //                   {['JavaScript', 'Python', 'C++'].map((lang) => (
  //                     <label key={lang} className="flex items-center space-x-2 text-sm">
  //                       <input
  //                         type="checkbox"
  //                         checked={preferredLanguage.includes(lang)}
  //                         onChange={() => handleCheckboxChange(lang)}
  //                         className="form-checkbox text-indigo-600"
  //                       />
  //                       <span>{lang}</span>
  //                     </label>
  //                   ))}
  //                 </div>
  //               </div>

  //               <div className="mb-6">
  //                 <label className="block text-sm font-medium mb-1">Skill Level</label>
  //                 <select
  //                   value={skillLevel}
  //                   onChange={(e) => setSkillLevel(e.target.value)}
  //                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
  //                 >
  //                   <option value="">Select</option>
  //                   <option value="Beginner">Beginner</option>
  //                   <option value="Intermediate">Intermediate</option>
  //                   <option value="Advanced">Advanced</option>
  //                 </select>
  //               </div>

  //               <button
  //                 onClick={handleUpdate}
  //                 className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
  //               >
  //                 Save Changes
  //               </button>
  //             </>
  //           ) : (
  //             <>
  //               <div className="mb-4">
  //                 <p className="text-sm text-gray-700">
  //                   <strong>Bio:</strong> {profileData?.bio || 'No bio added.'}
  //                 </p>
  //               </div>
  //               <div className="mb-4">
  //                 <p className="text-sm text-gray-700">
  //                   <strong>Languages:</strong>{' '}
  //                   {Array.isArray(profileData?.preferredLanguage)
  //                     ? profileData.preferredLanguage.join(', ')
  //                     : 'Not Set'}
  //                 </p>
  //               </div>
  //               <div className="mb-4">
  //                 <p className="text-sm text-gray-700">
  //                   <strong>Skill Level:</strong>{' '}
  //                   {Array.isArray(profileData?.skillLevel)
  //                     ? profileData.skillLevel[0]
  //                     : profileData?.skillLevel || 'Beginner'}
  //                 </p>
  //               </div>
  //             </>
  //           )}
  //         </div>
      
  //     </div>
  //   </div>
    






