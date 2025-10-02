import React, { createContext, useContext, useState } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.achievements': 'الإنجازات',
    'nav.contact': 'تواصل معي',
    
    // Hero Section
    'hero.title': 'نمر عادل',
    'hero.subtitle': 'مطور برمجيات | مهندس تطبيقات | مصمم واجهات',
    'hero.description': 'مرحباً! أنا مطور شغوف بتطوير الحلول التقنية المبتكرة وتصميم تجارب مستخدم استثنائية. أهتم بتطوير التطبيقات ومواقع الويب باستخدام أحدث التقنيات والأدوات.',
    
    // Projects Section
    'projects.title': 'مشاريعي',
    'projects.description': 'مجموعة من المشاريع التي طورتها باستخدام أحدث التقنيات والأدوات',
    'projects.all': 'الكل',
    'projects.apps': 'التطبيقات',
    'projects.websites': 'مواقع الويب',
    'projects.other': 'أخرى',
    'projects.viewDetails': 'عرض التفاصيل',
    'projects.description_label': 'وصف المشروع',
    'projects.technologies': 'التقنيات المستخدمة',
    'projects.purpose': 'الهدف من المشروع',
    'projects.goals': 'الأهداف المحققة',
    'projects.screenshots': 'لقطات الشاشة',
    'projects.sourceCode': 'كود المشروع',
    'projects.liveDemo': 'مشاهدة المشروع',
    'projects.video': 'فيديو توضيحي',
    
    // Achievements Section
    'achievements.title': 'الإنجازات والشهادات',
    'achievements.description': 'رحلتي التعليمية والمهنية من خلال الدورات والمسابقات التي شاركت فيها',
    'achievements.courses': 'الدورات والتدريبات',
    'achievements.competitions': 'المسابقات والهاكاثونات',
    'achievements.experience': 'التجربة والتعلم:',
    'achievements.skills': 'المهارات المكتسبة:',
    
    // Contact Section
    'contact.title': 'تواصل معي',
    'contact.description': 'هل لديك مشروع تريد تطويره؟ أم تريد التعاون معي؟ لا تتردد في التواصل',
    'contact.info': 'معلومات التواصل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.location': 'الموقع',
    'contact.form.title': 'أرسل رسالة',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال الرسالة',
    'contact.cta.title': 'جاهز لبدء مشروعك؟',
    'contact.cta.description': 'دعنا نحول فكرتك إلى واقع رقمي مذهل. أتطلع للعمل معك!',
    'contact.cta.email': 'راسلني الآن',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.achievements': 'Achievements',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Nemer Adel',
    'hero.subtitle': 'Software Developer | Application Engineer | UI Designer',
    'hero.description': 'Hello! I am a passionate developer focused on creating innovative technical solutions and designing exceptional user experiences. I specialize in developing applications and websites using the latest technologies and tools.',
    
    // Projects Section
    'projects.title': 'My Projects',
    'projects.description': 'A collection of projects I developed using the latest technologies and tools',
    'projects.all': 'All',
    'projects.apps': 'Applications',
    'projects.websites': 'Websites',
    'projects.other': 'Other',
    'projects.viewDetails': 'View Details',
    'projects.description_label': 'Project Description',
    'projects.technologies': 'Technologies Used',
    'projects.purpose': 'Project Purpose',
    'projects.goals': 'Achieved Goals',
    'projects.screenshots': 'Screenshots',
    'projects.sourceCode': 'Source Code',
    'projects.liveDemo': 'Live Demo',
    'projects.video': 'Demo Video',
    
    // Achievements Section
    'achievements.title': 'Achievements & Certificates',
    'achievements.description': 'My educational and professional journey through courses and competitions I participated in',
    'achievements.courses': 'Courses & Training',
    'achievements.competitions': 'Competitions & Hackathons',
    'achievements.experience': 'Experience & Learning:',
    'achievements.skills': 'Skills Acquired:',
    
    // Contact Section
    'contact.title': 'Contact Me',
    'contact.description': 'Do you have a project you want to develop? Or want to collaborate with me? Don\'t hesitate to get in touch',
    'contact.info': 'Contact Information',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.cta.title': 'Ready to start your project?',
    'contact.cta.description': 'Let\'s turn your idea into an amazing digital reality. I look forward to working with you!',
    'contact.cta.email': 'Email me now',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};