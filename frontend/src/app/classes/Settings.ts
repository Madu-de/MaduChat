export interface Settings {
  id: string;
  language: string;
  showAvatar: boolean;
  onlinePrivacy: 'everyone' | 'friends' | 'no one';
}