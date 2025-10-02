import React, { useEffect, useState } from 'react';
import { ChevronDown, Linkedin, Mail, Phone, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile } from '../hooks/useProfile';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, t } = useLanguage();
  const { profile, loading } = useProfile();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactLinks = [
    {
      icon: Linkedin,
      href: profile?.linkedin_url || 'https://www.linkedin.com/in/nemer-adel',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Mail,
      href: `mailto:${profile?.email || 'nemeradel62@gmail.com'}`,
      label: 'Email',
      color: 'hover:text-red-500',
    },
    {
      icon: Phone,
      href: `tel:${profile?.phone || '0791569362'}`,
      label: 'Phone',
      color: 'hover:text-green-500',
    },
    {
      icon: Github,
      href: profile?.github_url || '#',
      label: 'GitHub',
      color: 'hover:text-gray-700 dark:hover:text-gray-300',
    },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Hero Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Profile Image */}
        <div className={`mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl 
                         border-4 border-white dark:border-gray-700 
                         hover:scale-105 transition-transform duration-500">
            <img
              src={profile?.profile_image_url || "/placeholder-avatar.jpg"}
              alt={t('hero.title')}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400";
              }}
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className={`text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {profile ? (language === 'ar' ? profile.name_ar : profile.name_en) : t('hero.title')}
          </h1>
          <h2 className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {profile ? (language === 'ar' ? profile.title_ar : profile.title_en) : t('hero.subtitle')}
          </h2>
          <p className={`text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {profile ? (language === 'ar' ? profile.description_ar : profile.description_en) : t('hero.description')}
          </p>
        </div>

        {/* Contact Links */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-wrap justify-center gap-6">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 
                           rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                           text-gray-700 dark:text-gray-300 ${link.color}
                           hover:scale-105 group`}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <ChevronDown 
            size={32} 
            className="mx-auto text-gray-400 dark:text-gray-500 animate-bounce cursor-pointer
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </section>
  );
};

export default Hero;