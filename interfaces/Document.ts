import { Requirement } from '@/interfaces/Requirement';
import { Forum } from '@/interfaces/Forum';
import { Template } from '@/interfaces/Template';
import { Version } from '@/interfaces/Version';

export interface Document {
    id: number;
    id_project: number;
    id_user: number;
    title: string;
    timestamp: string;
    //forums: Forum[];
    template: Template;
    project: Project;
    version: Version
    //requirements: Requirement[];
}

export interface Project {
    id: number;
    name: string;
}