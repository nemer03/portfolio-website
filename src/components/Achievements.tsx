import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, BookOpen, Trophy, AlignCenterVertical as Certificate } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAchievements } from '../hooks/useAchievements';


const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'competitions'>('courses');
  const { language, t } = useLanguage();
  const { courses, competitions, loading } = useAchievements();

  return (
    <section id="achievements" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('achievements.title')}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('achievements.description')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${language === 'ar' ? 'font-cairo' : 'font-inter'}
                        ${activeTab === 'courses'
                          ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
            >
              <BookOpen size={20} />
              {t('achievements.courses')}
            </button>
            <button
              onClick={() => setActiveTab('competitions')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${language === 'ar' ? 'font-cairo' : 'font-inter'}
                        ${activeTab === 'competitions'
                          ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
            >
              <Trophy size={20} />
              {t('achievements.competitions')}
            </button>
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl 
                             transition-all duration-500 overflow-hidden group hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Certificate Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={course.image_url}
                        alt={language === 'ar' ? course.name_ar : course.name_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2">
                        <Certificate size={20} className="text-blue-600" />
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.date}</span>
                      </div>
                      <h3 className={`text-xl font-bold text-gray-800 dark:text-white mb-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                        {language === 'ar' ? course.name_ar : course.name_en}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {course.provider}
                      </p>
                      <p className={`text-gray-600 dark:text-gray-400 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                        {language === 'ar' ? course.description_ar : course.description_en}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 
                                     dark:text-blue-300 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Competitions Tab */}
        {activeTab === 'competitions' && (
          <>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {competitions.map((competition, index) => (
                  <div
                    key={competition.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden
                             hover:shadow-xl transition-all duration-500"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                      {/* Competition Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy size={24} className="text-yellow-500" />
                          <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                            {language === 'ar' ? competition.position_ar : competition.position_en}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-gray-500 dark:text-gray-400">{competition.date}</span>
                        </div>

                        <h3 className={`text-2xl font-bold text-gray-800 dark:text-white mb-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                          {language === 'ar' ? competition.name_ar : competition.name_en}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                          {language === 'ar' ? competition.type_ar : competition.type_en}
                        </p>
                        <p className={`text-gray-600 dark:text-gray-400 mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                          {language === 'ar' ? competition.description_ar : competition.description_en}
                        </p>

                        {/* Experience */}
                        <div className="mb-6">
                          <h4 className={`font-bold text-gray-800 dark:text-white mb-3 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                            {t('achievements.experience')}
                          </h4>
                          <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                            {language === 'ar' ? competition.experience_ar : competition.experience_en}
                          </p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className={`font-bold text-gray-800 dark:text-white mb-3 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                            {t('achievements.skills')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {competition.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 
                                         dark:text-green-300 rounded-lg text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image Gallery */}
                      <div>
                        {competition.image_url && (
                          <div className="mb-4">
                            <img
                              src={competition.image_url}
                              alt={language === 'ar' ? competition.name_ar : competition.name_en}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}
                        {competition.gallery.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {competition.gallery.map((image, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={image}
                                alt={`${language === 'ar' ? competition.name_ar : competition.name_en} ${imgIndex + 1}`}
                                className="w-full h-32 object-cover rounded-lg hover:scale-105 
                                         transition-transform duration-300"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Achievements;