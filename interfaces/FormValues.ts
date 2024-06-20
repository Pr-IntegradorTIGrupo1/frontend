export interface Template {
    id: number;
    title: string;
    format: string; // Note that format is string here, parsed later
  }

export interface Project {
    id: string;
    name: string;
  }

export interface Fields {
    label: string;
    value: string;
  }
  
export interface Requirement {
    fields: Fields[];
  }

export interface FormValues {
    project: string;
    template: string;
    documentTitle: string;
    requirements: Requirement[];
}