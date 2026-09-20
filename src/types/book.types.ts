export interface IBook {
    id: string; 
    title: string;
    author: string;
    year: number;
    genre: string;
    publisher?: string;
    isAvailable: boolean;
    description?: string;
    coverImage?: string;
    pages?: number;
}
