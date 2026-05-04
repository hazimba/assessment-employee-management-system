export interface Position {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  department_id: number | null;
  position_id: number | null;
  role?: string;
  status?: string;
  created_at: string;
  updated_at: string;
  position?: Position;
  department?: Department;
}
