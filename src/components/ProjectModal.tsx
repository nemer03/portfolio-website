import React from 'react';
import { X, Github, ExternalLink, Play, Code, Target, CheckCircle } from 'lucide-react';
import { Project } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-cairo">
            {language === 'ar' ? project.title_ar : project.title_en}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={project.image_url}
              alt={language === 'ar' ? project.title_ar : project.title_en}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white mb-4 font-cairo">
              <Code size={24} />
              {language === 'ar' ? 'وصف المشروع' : 'Project Description'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-cairo">
              {language === 'ar' ? project.description_ar : project.description_en}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-cairo">
              {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 
                           dark:text-blue-300 rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white mb-4 font-cairo">
              <Target size={24} />
              {language === 'ar' ? 'الهدف من المشروع' : 'Project Purpose'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-cairo">
              {language === 'ar' ? project.purpose_ar : project.purpose_en}
            </p>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-cairo">
              {language === 'ar' ? 'الأهداف المحققة' : 'Achieved Goals'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(language === 'ar' ? project.goals_ar : project.goals_en)?.map((goal, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-cairo">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-cairo">
                {language === 'ar' ? 'لقطات الشاشة' : 'Screenshots'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={screenshot}
                      alt={language === 'ar' ? `لقطة شاشة ${index + 1}` : `Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg
                         hover:bg-gray-900 transition-colors duration-300"
              >
                <Github size={20} />
                {language === 'ar' ? 'كود المشروع' : 'Source Code'}
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-300"
              >
                <ExternalLink size={20} />
                {language === 'ar' ? 'مشاهدة المشروع' : 'Live Demo'}
              </a>
            )}
            {project.video_url && (
              <a
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg
                         hover:bg-red-700 transition-colors duration-300"
              >
                <Play size={20} />
                {language === 'ar' ? 'فيديو توضيحي' : 'Demo Video'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;