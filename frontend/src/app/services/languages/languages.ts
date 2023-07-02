import { Language } from './language.interface';
import { DE } from './de';
import { EN } from './en';
import { FR } from './fr';
import { ES } from './es';

export const LANGUAGES: {[key: string]: Language} = {
  'Deutsch': DE,
  'English': EN,
  'Français': FR,
  'Español': ES
};
