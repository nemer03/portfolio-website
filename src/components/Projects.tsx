import React, { useState } from 'react';
import { ExternalLink, Github, X, Code, Smartphone, Globe, Folder } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import ProjectModal from './ProjectModal';
import { Project } from '../lib/supabase';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'apps' | 'websites' | 'other'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language, t } = useLanguage();
  const { projects, loading } = useProjects();

  const categories = [
    { id: 'all', name: t('projects.all'), icon: Folder },
    { id: 'apps', name: t('projects.apps'), icon: Smartphone },
    { id: 'websites', name: t('projects.websites'), icon: Globe },
    { id: 'other', name: t('projects.other'), icon: Code },
  ];


  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('projects.title')}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('projects.description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                         ${activeCategory === category.id
                           ? 'bg-blue-600 text-white shadow-lg'
                           : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                         } hover:scale-105 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-500 overflow-hidden group hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image_url}
                  alt={language === 'ar' ? project.title_ar : project.title_en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium
                             hover:bg-gray-100 transition-colors duration-300"
                  >
                    {t('projects.viewDetails')}
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold text-gray-800 dark:text-white mb-3 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                  {language === 'ar' ? project.title_ar : project.title_en}
                </h3>
                <p className={`text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                  {language === 'ar' ? project.description_ar : project.description_en}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 
                               dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 
                                   dark:text-gray-400 rounded-full text-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 
                               hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;