import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function SkillsPage() {
  const location = useLocation();
  const { skills } = location.state || { skills: [] };

  // Define categories and map skills to them (simplified mapping for demonstration)
  // In a real app, this mapping might be more dynamic or based on backend categorization
  const categorizedSkills = {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    Language: ["C", "Python"],
    Libraries: ["numpy", "pandas", "matplotlib", "seaborn", "scikit-learn", "streamlit", "tkinter", "FastAPI", "PyMuPDF", "spacy", "python-multipart"], // Added backend libraries too
    Technology: ["Machine Learning", "Data Science", "Data Analysis", "SQL", "Docker", "Git", "Agile", "NLP", "Computer Vision", "Web Development"],
  };

  const skillsByCategory = {};

  // Initialize categories with empty arrays
  Object.keys(categorizedSkills).forEach(category => {
    skillsByCategory[category] = [];
  });

  // Populate skillsByCategory based on extracted skills and predefined categories
  skills.forEach(extractedSkill => {
    const lowerExtractedSkill = extractedSkill.toLowerCase();
    let foundCategory = false;
    for (const category in categorizedSkills) {
      if (categorizedSkills[category].some(skill => skill.toLowerCase() === lowerExtractedSkill)) {
        skillsByCategory[category].push(extractedSkill);
        foundCategory = true;
        break; 
      }
    }
    // Optional: add skills not in predefined categories to a 'Other' category
    // if (!foundCategory) {
    //   if (!skillsByCategory['Other']) skillsByCategory['Other'] = [];
    //   skillsByCategory['Other'].push(extractedSkill);
    // }
  });

  const hasSkills = skills.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Extracted Skills</h2>
        
        {hasSkills ? (
          <div className="space-y-8">
            {Object.keys(skillsByCategory).map(category => {
              const skillsInSection = skillsByCategory[category];
              if (skillsInSection.length === 0) return null;

              return (
                <div key={category} className="animate-slideInUp">
                  <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillsInSection.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 bg-blue-100 text-blue-800 text-base font-medium rounded-full shadow-sm transition-transform transform hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Handle 'Other' category if implemented */}
            {/* {skillsByCategory['Other'] && skillsByCategory['Other'].length > 0 && (
                 <div className="animate-slideInUp">
                   <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Other</h3>
                   <div className="flex flex-wrap gap-3">
                     {skillsByCategory['Other'].map((skill, index) => (
                       <span
                         key={index}
                         className="px-4 py-2 bg-gray-100 text-gray-800 text-base font-medium rounded-full shadow-sm transition-transform transform hover:scale-105"
                       >
                         {skill}
                       </span>
                     ))}
                   </div>
                 </div>
               )} */}

          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No skills found in the uploaded resume.</p>
        )}

        <div className="mt-10 text-center">
           <Link to="/" className="text-blue-600 hover:underline text-lg font-medium">
             Upload another resume
           </Link>
         </div>
      </div>
    </div>
  );
}

export default SkillsPage; 