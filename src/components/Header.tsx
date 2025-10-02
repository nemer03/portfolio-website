import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, Briefcase, Award, MessageCircle, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home', icon: Home },
    { name: t('nav.projects'), href: '#projects', icon: Briefcase },
    { name: t('nav.achievements'), href: '#achievements', icon: Award },
    { name: t('nav.contact'), href: '#contact', icon: MessageCircle },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 ${language === 'ar' ? 'left-0 right-0' : 'left-0 right-0'} z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className={`text-2xl font-bold text-blue-800 dark:text-blue-300 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('hero.title')}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 
                           hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300
                           hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg ${language === 'ar' ? 'font-cairo' : 'font-inter'}"
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Languages size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md 
                         rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300
                           hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 
                           dark:hover:bg-blue-900/20 transition-all duration-300 ${language === 'ar' ? 'font-cairo' : 'font-inter'}"
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;