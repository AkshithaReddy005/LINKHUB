export interface Link {
  id: string;
  title: string;
  url: string;
  username?: string;
  category: 'coding' | 'ai' | 'resume' | 'courses' | 'others';
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface LinkFormData {
  title: string;
  url: string;
  username?: string;
  category: 'coding' | 'ai' | 'resume' | 'courses' | 'others';
  description?: string;
  icon?: string;
}