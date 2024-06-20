import { Document } from '@/interfaces/Document';

export interface Version {
    id: number;
    id_user: number;
    timestamp: string;
    version: GLfloat;
    document: Document;
    document_old: Document;
}