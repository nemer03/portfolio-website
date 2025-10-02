import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile } from '../hooks/useProfile';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    const subject = encodeURIComponent(`رسالة من ${formData.name}`);
    const body = encodeURIComponent(`الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\n\nالرسالة:\n${formData.message}`);
    window.open(`mailto:nemeradel62@gmail.com?subject=${subject}&body=${body}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: profile?.email || 'nemeradel62@gmail.com',
      href: `mailto:${profile?.email || 'nemeradel62@gmail.com'}`,
      color: 'text-red-500'
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: profile?.phone || '0791569362',
      href: `tel:${profile?.phone || '0791569362'}`,
      color: 'text-green-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: profile?.linkedin_url?.replace('https://', '') || 'linkedin.com/in/nemer-adel',
      href: profile?.linkedin_url || 'https://www.linkedin.com/in/nemer-adel',
      color: 'text-blue-500'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: profile?.github_url?.replace('https://', '') || 'github.com/nemer-adel',
      href: profile?.github_url || 'https://github.com/nemer-adel',
      color: 'text-gray-700 dark:text-gray-300'
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: profile ? (language === 'ar' ? profile.location_ar : profile.location_en) : (language === 'ar' ? 'عمان، الأردن' : 'Amman, Jordan'),
      href: '#',
      color: 'text-purple-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                {t('contact.info')}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg
                               shadow-md hover:shadow-lg transition-all duration-300 group
                               hover:scale-105"
                    >
                      <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:scale-110 
                                    transition-transform duration-300`}>
                        <Icon size={24} className={info.color} />
                      </div>
                      <div>
                        <p className={`font-medium text-gray-800 dark:text-white ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                          {info.label}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className={`text-xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                {t('contact.cta.title')}
              </h3>
              <p className={`mb-6 opacity-90 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                {t('contact.cta.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile?.email || 'nemeradel62@gmail.com'}`}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium
                           hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail size={18} />
                  {t('contact.cta.email')}
                </a>
                <a
                  href={profile?.linkedin_url || 'https://www.linkedin.com/in/nemer-adel'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium
                           hover:bg-white/30 transition-colors duration-300 flex items-center gap-2"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className={`text-2xl font-bold text-gray-800 dark:text-white mb-6 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:text-white transition-colors duration-300"
                  placeholder={language === 'ar' ? 'اكتب اسمك' : 'Enter your name'}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:text-white transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:text-white transition-colors duration-300 resize-none"
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                         rounded-lg font-medium hover:from-blue-700 hover:to-purple-700
                         transition-all duration-300 flex items-center justify-center gap-2
                         hover:scale-105 shadow-lg"
              >
                <Send size={18} />
                {t('contact.form.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;