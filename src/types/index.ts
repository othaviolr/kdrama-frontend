export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Drama {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  poster: string;
  banner?: string;
  releaseDate: Date;
  endDate?: Date;
  totalEpisodes: number;
  duration: number; // em minutos
  genres: Genre[];
  country: string;
  network: string;
  rating: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  cast: CastMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  character?: string;
  avatar?: string;
}

export interface UserDrama {
  id: string;
  userId: string;
  dramaId: string;
  status: 'watching' | 'completed' | 'dropped' | 'plan_to_watch' | 'on_hold';
  currentEpisode: number;
  rating?: number;
  review?: string;
  startDate?: Date;
  finishDate?: Date;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  drama: Drama;
}

export interface Review {
  id: string;
  userId: string;
  dramaId: string;
  rating: number;
  content: string;
  spoilerFree: boolean;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  drama: Drama;
}

export interface List {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublic: boolean;
  items: ListItem[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface ListItem {
  id: string;
  listId: string;
  dramaId: string;
  order: number;
  note?: string;
  drama: Drama;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'review' | 'rating' | 'status_update' | 'list_creation' | 'list_update';
  data: any;
  createdAt: Date;
  user: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new_episode' | 'friend_activity' | 'recommendation' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

export interface Stats {
  totalWatched: number;
  totalTimeWatched: number; // em minutos
  totalEpisodes: number;
  totalReviews: number;
  averageRating: number;
  favoriteGenres: { genre: Genre; count: number }[];
  watchingStreak: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}
