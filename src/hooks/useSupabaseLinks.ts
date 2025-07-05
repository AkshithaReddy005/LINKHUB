import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from '../types';

export function useSupabaseLinks(category: string, user: any) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!user) { setLinks([]); setLoading(false); return; }
    setLoading(true);
    let query = supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);
    if (category !== 'all') {
      query = query.eq('category', category);
    }
    query
      .order('createdAt', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setLinks(data as Link[]);
        setLoading(false);
      });
  }, [category, user]);

  // Add link
  const addLink = async (data: Omit<Link, 'id' | 'createdAt'>) => {
    if (!user) throw new Error('Not logged in');
    const { data: inserted, error } = await supabase
      .from('links')
      .insert([{ ...data, user_id: user.id, createdAt: new Date().toISOString() }])
      .select();
    if (error) throw error;
    if (inserted && inserted[0]) setLinks((prev) => [inserted[0], ...prev]);
  };

  // Edit link
  const editLink = async (id: string, data: Partial<Link>) => {
    const { data: updated, error } = await supabase
      .from('links')
      .update(data)
      .eq('id', id)
      .select();
    if (error) throw error;
    if (updated && updated[0]) setLinks((prev) => prev.map(l => l.id === id ? updated[0] : l));
  };

  // Delete link
  const deleteLink = async (id: string) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id);
    if (error) throw error;
    setLinks((prev) => prev.filter(l => l.id !== id));
  };

  return { links, loading, error, addLink, editLink, deleteLink };
}
