import React from 'react';

const languages = [
    { name: 'JavaScript' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'C++' },
    { name: 'Ruby' }
];

function SkillPage() {
    return (
        <div className="py-16 px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-[100px]">
                Challenges Available in Skills
            </h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {languages.map((lang, index) => (
                    <div
                        key={index}
                        className="bg-[#e6f0ee] rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
                    >
                        <div className="text-3xl font-semibold text-gray-800 mb-2">{lang.name}</div>
                        <p className="text-sm text-gray-500">Experienced in {lang.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillPage;
