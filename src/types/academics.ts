export interface University {
  id: string;
  name: string;
}

export interface College {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  collegeId: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'note' | 'pastQuestion' | 'tutorial';
  level: number;
  collegeId: string;
  departmentId: string;
  url: string;
  image?: string;
  isRowReverse?: boolean;
}

export interface FilterState {
  level: number | null;
  collegeId: string | null;
  departmentId: string | null;
}
