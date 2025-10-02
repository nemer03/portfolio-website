import { useState, useEffect } from 'react';
import { supabase, Course, Competition } from '../lib/supabase';

export const useAchievements = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      
      const [coursesResponse, competitionsResponse] = await Promise.all([
        supabase.from('courses').select('*').order('date', { ascending: false }),
        supabase.from('competitions').select('*').order('date', { ascending: false })
      ]);

      if (coursesResponse.error) throw coursesResponse.error;
      if (competitionsResponse.error) throw competitionsResponse.error;

      setCourses(coursesResponse.data || []);
      setCompetitions(competitionsResponse.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return { courses, competitions, loading, error, refetch: fetchAchievements };
};