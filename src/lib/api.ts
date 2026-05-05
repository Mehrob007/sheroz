// API для работы с LocalStorage (вместо Go бэкенда)

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

const STORAGE_KEYS = {
  EMPLOYEES: 'sheroz_employees',
  DEPARTMENTS: 'sheroz_departments',
  POSITIONS: 'sheroz_positions',
};

// Хелперы для работы с LocalStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Начальные данные (Seed)
const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Кафедра математического анализа', short_name: 'МатАн', head_id: '', description: '' },
  { id: 'd2', name: 'Кафедра высшей алгебры и теории чисел', short_name: 'Алгебра', head_id: '', description: '' },
  { id: 'd3', name: 'Кафедра геометрии и топологии', short_name: 'Геометрия', head_id: '', description: '' },
  { id: 'd4', name: 'Кафедра теории вероятностей', short_name: 'ТеорВер', head_id: '', description: '' },
  { id: 'd5', name: 'Кафедра вычислительной математики', short_name: 'ВычМат', head_id: '', description: '' },
  { id: 'd6', name: 'Кафедра теоретической механики', short_name: 'ТеорМех', head_id: '', description: '' },
  { id: 'd7', name: 'Кафедра системного программирования', short_name: 'СП', head_id: '', description: '' },
];

const INITIAL_POSITIONS: Position[] = [
  { id: 'p1', name: 'Профессор', short_name: 'проф.', category: 'ППС' },
  { id: 'p2', name: 'Доцент', short_name: 'доц.', category: 'ППС' },
  { id: 'p3', name: 'Старший преподаватель', short_name: 'ст.преп.', category: 'ППС' },
  { id: 'p4', name: 'Ассистент', short_name: 'асс.', category: 'ППС' },
  { id: 'p5', name: 'Заведующий лабораторией', short_name: 'зав.лаб.', category: 'УВП' },
  { id: 'p6', name: 'Ведущий инженер', short_name: 'вед.инж.', category: 'УВП' },
  { id: 'p7', name: 'Инженер 1 категории', short_name: 'инж.1к.', category: 'УВП' },
  { id: 'p8', name: 'Специалист по учебно-методической работе', short_name: 'спец.УМР', category: 'АУП' },
  { id: 'p9', name: 'Инспектор деканата', short_name: 'инсп.', category: 'АУП' },
  { id: 'p10', name: 'Лаборант', short_name: 'лаб.', category: 'УВП' },
];

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    last_name: 'Иванов',
    first_name: 'Иван',
    middle_name: 'Иванович',
    birth_date: '1975-05-12',
    gender: 'Мужской',
    phone: '+7 900 123-45-67',
    email: 'ivanov@math.msu.ru',
    address: 'г. Москва, ул. Ленинские горы, д. 1',
    position_id: 'p1',
    position_name: 'Профессор',
    department_id: 'd1',
    department_name: 'Кафедра математического анализа',
    employment_type: 'Штат',
    rate: 1.0,
    hire_date: '2000-09-01',
    education: 'МГУ имени М.В.Ломоносова',
    degree: 'Доктор физико-математических наук',
    rank: 'Профессор',
    passport_series: '4500',
    passport_number: '123456',
    inn: '771234567890',
    snils: '123-456-789 01',
  },
  {
    id: 'e2',
    last_name: 'Петрова',
    first_name: 'Мария',
    middle_name: 'Сергеевна',
    birth_date: '1988-10-24',
    gender: 'Женский',
    phone: '+7 911 987-65-43',
    email: 'petrova@math.msu.ru',
    address: 'г. Москва, пр-т Вернадского, д. 10',
    position_id: 'p2',
    position_name: 'Доцент',
    department_id: 'd7',
    department_name: 'Кафедра системного программирования',
    employment_type: 'Штат',
    rate: 0.5,
    hire_date: '2015-02-01',
    education: 'МГУ имени М.В.Ломоносова',
    degree: 'Кандидат физико-математических наук',
    rank: 'Доцент',
    passport_series: '4510',
    passport_number: '654321',
    inn: '770987654321',
    snils: '987-654-321 09',
  }
];

// Инициализация данных
export function initStorage() {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(STORAGE_KEYS.DEPARTMENTS)) {
    saveToStorage(STORAGE_KEYS.DEPARTMENTS, INITIAL_DEPARTMENTS);
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.POSITIONS)) {
    saveToStorage(STORAGE_KEYS.POSITIONS, INITIAL_POSITIONS);
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    saveToStorage(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }
}

// Получить всех сотрудников
export async function getEmployees(): Promise<Employee[]> {
  initStorage();
  return getFromStorage<Employee[]>(STORAGE_KEYS.EMPLOYEES, []);
}

// Получить сотрудника по ID
export async function getEmployee(id: string): Promise<Employee> {
  const employees = await getEmployees();
  const employee = employees.find(e => e.id === id);
  if (!employee) throw new Error('Employee not found');
  return employee;
}

// Создать сотрудника
export async function createEmployee(data: Partial<Employee>): Promise<Employee> {
  const employees = await getEmployees();
  const departments = await getDepartments();
  const positions = await getPositions();
  
  const newEmployee: Employee = {
    id: Math.random().toString(36).substr(2, 9),
    last_name: data.last_name || '',
    first_name: data.first_name || '',
    middle_name: data.middle_name || '',
    birth_date: data.birth_date || '',
    gender: data.gender || 'Мужской',
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    position_id: data.position_id || '',
    position_name: positions.find(p => p.id === data.position_id)?.name || '',
    department_id: data.department_id || '',
    department_name: departments.find(d => d.id === data.department_id)?.name || '',
    employment_type: data.employment_type || 'Штат',
    rate: data.rate || 1.0,
    hire_date: data.hire_date || new Date().toISOString().split('T')[0],
    education: data.education || '',
    degree: data.degree || '',
    rank: data.rank || '',
    passport_series: data.passport_series || '',
    passport_number: data.passport_number || '',
    inn: data.inn || '',
    snils: data.snils || '',
  };
  
  employees.push(newEmployee);
  saveToStorage(STORAGE_KEYS.EMPLOYEES, employees);
  return newEmployee;
}

// Обновить сотрудника
export async function updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
  const employees = await getEmployees();
  const departments = await getDepartments();
  const positions = await getPositions();
  
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Employee not found');
  
  const updatedEmployee = { 
    ...employees[index], 
    ...data,
    position_name: data.position_id ? positions.find(p => p.id === data.position_id)?.name || employees[index].position_name : employees[index].position_name,
    department_name: data.department_id ? departments.find(d => d.id === data.department_id)?.name || employees[index].department_name : employees[index].department_name,
  };
  
  employees[index] = updatedEmployee;
  saveToStorage(STORAGE_KEYS.EMPLOYEES, employees);
  return updatedEmployee;
}

// Удалить сотрудника
export async function deleteEmployee(id: string): Promise<void> {
  const employees = await getEmployees();
  const filtered = employees.filter(e => e.id !== id);
  saveToStorage(STORAGE_KEYS.EMPLOYEES, filtered);
}

// Поиск сотрудников
export async function searchEmployees(query: string): Promise<Employee[]> {
  const employees = await getEmployees();
  if (!query) return employees;
  
  const q = query.toLowerCase();
  return employees.filter(e => 
    e.last_name.toLowerCase().includes(q) ||
    e.first_name.toLowerCase().includes(q) ||
    e.middle_name.toLowerCase().includes(q) ||
    e.department_name.toLowerCase().includes(q) ||
    e.position_name.toLowerCase().includes(q)
  );
}

// Кафедры
export async function getDepartments(): Promise<Department[]> {
  initStorage();
  return getFromStorage<Department[]>(STORAGE_KEYS.DEPARTMENTS, []);
}

// Должности
export async function getPositions(): Promise<Position[]> {
  initStorage();
  return getFromStorage<Position[]>(STORAGE_KEYS.POSITIONS, []);
}

// Seed data
export async function seedData(): Promise<void> {
  localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
  localStorage.removeItem(STORAGE_KEYS.DEPARTMENTS);
  localStorage.removeItem(STORAGE_KEYS.POSITIONS);
  initStorage();
}
