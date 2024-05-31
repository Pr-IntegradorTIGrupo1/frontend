import { Forum } from '@/interfaces/Forum';

export interface Comment {
    id: number;
    content: string;
    id_user: number;
    forum: Forum;
}