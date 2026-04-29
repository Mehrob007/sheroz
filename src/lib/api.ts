// API для работы с Go бэкендом
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Employee {
  id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  birth_date: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  position_id: string;
  position_name: string;
  department_id: string;
  department_name: string;
  employment_type: string;
  rate: number;
  hire_date: string;
  fire_date?: string;
  education: string;
  degree: string;
  rank: string;
  passport_series: string;
  passport_number: string;
  inn: string;
  snils: string;
}

export interface Department {
  id: string;
  name: string;
  short_name: string;
  head_id: string;
  description: string;
}

export interface Position {
  id: string;
  name: string;
  short_name: string;
  category: string;
}

// Получить всех сотрудников
export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_URL}/employees`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}

// Получить сотрудника по ID
export async function getEmployee(id: string): Promise<Employee> {
  const res = await fetch(`${API_URL}/employees/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch employee');
  return res.json();
}

// Создать сотрудника
export async function createEmployee(data: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create employee');
  return res.json();
}

// Обновить сотрудника
export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update employee');
  return res.json();
}

// Удалить сотрудника
export async function deleteEmployee(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete employee');
}

// Поиск сотрудников
export async function searchEmployees(query: string): Promise<Employee[]> {
  const res = await fetch(`${API_URL}/employees/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to search employees');
  return res.json();
}

// Кафедры
export async function getDepartments(): Promise<Department[]> {
  const res = await fetch(`${API_URL}/departments`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch departments');
  return res.json();
}

// Должности
export async function getPositions(): Promise<Position[]> {
  const res = await fetch(`${API_URL}/positions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch positions');
  return res.json();
}

// Seed data
export async function seedData(): Promise<void> {
  const res = await fetch(`${API_URL}/seed`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to seed data');
}
