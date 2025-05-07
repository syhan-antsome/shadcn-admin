import { api } from '@/lib/api';
import { Kiosk } from '../data/schema'; 

const API_URL = '/kiosk';

export const kioskService = {
    getAll: async (): Promise<Kiosk[]> => {
        return await api.get<Kiosk[]>(API_URL);
    },
    getById: async (id: string): Promise<Kiosk> => {
        return await api.get<Kiosk>(`${API_URL}/${id}`);
    },
    create: async (kiosk: Kiosk): Promise<Kiosk> => {
        return await api.post<Kiosk>(API_URL, kiosk);
    },
    update: async (id: string, kiosk: Kiosk): Promise<Kiosk> => {
        return await api.put<Kiosk>(`${API_URL}/${id}`, kiosk);
    },
    delete: async (id: string): Promise<void> => {
        return await api.delete<void>(`${API_URL}/${id}`);
    }
};
