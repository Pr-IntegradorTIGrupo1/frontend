import { Document } from '@/interfaces/Document';

export interface Template {
    id: number;
    title: string;
    description: string;
    format: string;
    document: Document;

}