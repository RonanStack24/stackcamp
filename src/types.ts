export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  timestamp: string;
  avatarId: string;
}

export interface DeveloperBadge {
  name: string;
  role: string;
  skills: string[];
  color: string;
  character: string;
}

export interface UpcomingRegion {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
}
