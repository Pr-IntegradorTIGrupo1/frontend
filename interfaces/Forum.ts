import { Document } from '@/interfaces/Document'
import { Comment } from '@/interfaces/Comment'

export interface Forum {
    id: number;
    title: string;
    content: string;
    status: string;
    coments: Comment[];
    documents: Document[];
}