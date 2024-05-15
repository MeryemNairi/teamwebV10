import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFormData {
  id: number; 
  user: string; 
  likes: number; // Changé de string à number
  newsId: number;
}

export interface IFormProps {
  context: WebPartContext;
  newsId: number
}
