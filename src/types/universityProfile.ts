
export interface College {
  id: number;
  name: string;
  courses: Course[];
  admissionRequirements: string[];
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
}

export interface Ambassador {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
}

export interface UniversityData {
  id: number;
  name: string;
  logo: string;
  location: string;
  established: string;
  type: string;
  website: string;
  description: string;
  image: string;
  colleges: College[];
  ambassadors: Ambassador[];
}