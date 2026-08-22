import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: (typeof window !== 'undefined' && (window as any).__EVENTHUB_API_URL__) || environment.apiUrl
};