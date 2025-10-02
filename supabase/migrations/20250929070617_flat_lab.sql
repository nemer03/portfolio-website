/*
  # Create Portfolio Database Schema

  1. New Tables
    - `profiles`
      - `id` (int, primary key)
      - `name_ar` (text)
      - `name_en` (text)
      - `title_ar` (text)
      - `title_en` (text)
      - `description_ar` (text)
      - `description_en` (text)
      - `profile_image_url` (text)
      - `email` (text)
      - `phone` (text)
      - `linkedin_url` (text)
      - `github_url` (text)
      - `location_ar` (text)
      - `location_en` (text)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (int, primary key)
      - `title_ar` (text)
      - `title_en` (text)
      - `category` (text)
      - `image_url` (text)
      - `description_ar` (text)
      - `description_en` (text)
      - `technologies` (text array)
      - `purpose_ar` (text)
      - `purpose_en` (text)
      - `goals_ar` (text array)
      - `goals_en` (text array)
      - `github_url` (text, optional)
      - `live_url` (text, optional)
      - `video_url` (text, optional)
      - `screenshots` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `courses`
      - `id` (int, primary key)
      - `name_ar` (text)
      - `name_en` (text)
      - `provider` (text)
      - `date` (text)
      - `image_url` (text)
      - `description_ar` (text)
      - `description_en` (text)
      - `skills` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `competitions`
      - `id` (int, primary key)
      - `name_ar` (text)
      - `name_en` (text)
      - `type_ar` (text)
      - `type_en` (text)
      - `position_ar` (text)
      - `position_en` (text)
      - `date` (text)
      - `image_url` (text, optional)
      - `description_ar` (text)
      - `description_en` (text)
      - `experience_ar` (text)
      - `experience_en` (text)
      - `skills` (text array)
      - `gallery` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  profile_image_url TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  location_ar TEXT NOT NULL,
  location_en TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('apps', 'websites', 'other')),
  image_url TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  purpose_ar TEXT NOT NULL,
  purpose_en TEXT NOT NULL,
  goals_ar TEXT[] NOT NULL DEFAULT '{}',
  goals_en TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  video_url TEXT,
  screenshots TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  provider TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id SERIAL PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type_ar TEXT NOT NULL,
  type_en TEXT NOT NULL,
  position_ar TEXT NOT NULL,
  position_en TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  experience_ar TEXT NOT NULL,
  experience_en TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to courses"
  ON courses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to competitions"
  ON competitions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Allow authenticated users to manage profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage courses"
  ON courses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage competitions"
  ON competitions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO profiles (
  name_ar, name_en, title_ar, title_en, description_ar, description_en,
  profile_image_url, email, phone, linkedin_url, github_url, location_ar, location_en
) VALUES (
  'نمر عادل', 'Nemer Adel',
  'مطور برمجيات | مهندس تطبيقات | مصمم واجهات',
  'Software Developer | Application Engineer | UI Designer',
  'مرحباً! أنا مطور شغوف بتطوير الحلول التقنية المبتكرة وتصميم تجارب مستخدم استثنائية. أهتم بتطوير التطبيقات ومواقع الويب باستخدام أحدث التقنيات والأدوات.',
  'Hello! I am a passionate developer focused on creating innovative technical solutions and designing exceptional user experiences. I specialize in developing applications and websites using the latest technologies and tools.',
  'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
  'nemeradel62@gmail.com',
  '0791569362',
  'https://www.linkedin.com/in/nemer-adel',
  'https://github.com/nemer-adel',
  'عمان، الأردن',
  'Amman, Jordan'
);

-- Insert sample projects
INSERT INTO projects (
  title_ar, title_en, category, image_url, description_ar, description_en,
  technologies, purpose_ar, purpose_en, goals_ar, goals_en,
  github_url, live_url, video_url, screenshots
) VALUES 
(
  'تطبيق إدارة المهام', 'Task Management App', 'apps',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
  'تطبيق متكامل لإدارة المهام والمشاريع مع واجهة مستخدم عصرية وميزات متقدمة',
  'A comprehensive task and project management app with modern UI and advanced features',
  ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux'],
  'تم تطوير هذا التطبيق لمساعدة الأفراد والفرق على تنظيم مهامهم وزيادة الإنتاجية',
  'This app was developed to help individuals and teams organize their tasks and increase productivity',
  ARRAY['تحسين إدارة الوقت', 'تعزيز التعاون بين الفرق', 'توفير واجهة بسيطة وفعالة', 'دعم العمل بدون اتصال بالإنترنت'],
  ARRAY['Improve time management', 'Enhance team collaboration', 'Provide simple and effective interface', 'Support offline work'],
  'https://github.com/nemer-adel/task-manager',
  'https://task-manager-demo.com',
  'https://youtube.com/watch?v=demo',
  ARRAY[
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
),
(
  'موقع التجارة الإلكترونية', 'E-commerce Website', 'websites',
  'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
  'منصة تجارة إلكترونية متكاملة مع نظام دفع آمن وإدارة المخزون',
  'A comprehensive e-commerce platform with secure payment system and inventory management',
  ARRAY['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  'تطوير منصة تجارية شاملة تدعم البائعين المحليين في الأردن',
  'Develop a comprehensive commercial platform supporting local sellers in Jordan',
  ARRAY['دعم التجارة المحلية', 'توفير تجربة شراء سلسة', 'نظام إدارة متقدم للبائعين', 'واجهة متجاوبة لجميع الأجهزة'],
  ARRAY['Support local commerce', 'Provide smooth shopping experience', 'Advanced management system for sellers', 'Responsive interface for all devices'],
  'https://github.com/nemer-adel/ecommerce-platform',
  'https://ecommerce-demo.com',
  NULL,
  ARRAY[
    'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
);

-- Insert sample courses
INSERT INTO courses (
  name_ar, name_en, provider, date, image_url, description_ar, description_en, skills
) VALUES 
(
  'تطوير تطبيقات React Native', 'React Native Development', 'Meta', '2024',
  'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=400',
  'دورة متكاملة في تطوير التطبيقات باستخدام React Native',
  'Comprehensive course in React Native app development',
  ARRAY['React Native', 'JavaScript', 'Mobile Development', 'Redux']
),
(
  'تطوير مواقع الويب الكاملة', 'Full Stack Web Development', 'FreeCodeCamp', '2023',
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
  'شهادة في تطوير مواقع الويب الكاملة من الواجهة الأمامية والخلفية',
  'Certificate in full-stack web development covering frontend and backend',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB']
);

-- Insert sample competitions
INSERT INTO competitions (
  name_ar, name_en, type_ar, type_en, position_ar, position_en, date,
  image_url, description_ar, description_en, experience_ar, experience_en,
  skills, gallery
) VALUES 
(
  'هاكاثون الابتكار الأردني', 'Jordan Innovation Hackathon', 'هاكاثون', 'Hackathon',
  'المركز الثاني', 'Second Place', '2024',
  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400',
  'مسابقة الابتكار الأردنية للحلول التقنية',
  'Jordan Innovation Competition for Technical Solutions',
  'كانت تجربة رائعة حيث تعلمت كيفية العمل تحت الضغط وتطوير حلول إبداعية خلال 48 ساعة. عملت مع فريق متنوع من المطورين والمصممين لتطوير تطبيق يساعد في حل مشكلة النقل العام في عمان.',
  'It was an amazing experience where I learned how to work under pressure and develop creative solutions within 48 hours. I worked with a diverse team of developers and designers to develop an app that helps solve the public transportation problem in Amman.',
  ARRAY['React', 'Node.js', 'Team Collaboration', 'Innovation'],
  ARRAY[
    'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
);