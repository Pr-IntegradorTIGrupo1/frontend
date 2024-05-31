import { Document } from '@/interfaces/Document';

export interface Requirement {
    id: number;
    content: string;
    status: boolean;
    documents: Document[];
}