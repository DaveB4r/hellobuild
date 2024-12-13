export interface IRepository {
  id: string;
  name: string;
  url: string;
  description: string;
  isPrivate: boolean;
  primaryLanguage: {
    name: string;
    color: string
  }
}