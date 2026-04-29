# Система учёта сотрудников мехмата

Система учёта сотрудников механико-математического факультета на Go + React + MongoDB.

## Структура проекта

```
├── backend/                 # Go API сервер
│   ├── cmd/server/         # Точка входа
│   └── internal/
│       ├── config/         # Конфигурация
│       ├── handlers/       # HTTP обработчики
│       ├── models/         # Модели данных
│       └── repository/     # Работа с MongoDB
│
└── src/                    # Next.js React фронтенд
    ├── app/
    │   ├── employees/      # Страницы сотрудников
    │   └── page.tsx        # Главная
    ├── components/
    └── lib/api.ts          # API клиент
```

## Технологии

- **Backend**: Go 1.21, Gin, MongoDB Driver
- **Frontend**: Next.js 15, React 19, SCSS
- **Database**: MongoDB

## Запуск

### 1. MongoDB

```bash
# С помощью Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Или установите MongoDB локально
```

### 2. Go Backend

```bash
cd backend

# Установка зависимостей
go mod tidy

# Запуск сервера
go run cmd/server/main.go
```

Сервер запустится на `http://localhost:8080`

### 3. Next.js Frontend

```bash
# В корне проекта
bun install

# Запуск dev сервера
bun run dev
```

Фронтенд запустится на `http://localhost:3000`

## API Endpoints

### Сотрудники
- `GET /api/employees` - Получить всех сотрудников
- `GET /api/employees/:id` - Получить сотрудника по ID
- `POST /api/employees` - Создать сотрудника
- `PUT /api/employees/:id` - Обновить сотрудника
- `DELETE /api/employees/:id` - Удалить сотрудника
- `GET /api/employees/search?q=...` - Поиск сотрудников

### Кафедры
- `GET /api/departments` - Получить все кафедры
- `POST /api/departments` - Создать кафедру

### Должности
- `GET /api/positions` - Получить все должности
- `POST /api/positions` - Создать должность

### Утилиты
- `POST /api/seed` - Заполнить базу начальными данными
- `GET /api/health` - Проверка здоровья

## Начальные данные

При первом запуске нажмите кнопку "Заполнить базу данных" на странице добавления сотрудника или выполните:

```bash
curl -X POST http://localhost:8080/api/seed
```

Это создаст:
- 7 кафедр мехмата
- 10 должностей (ППС, УВП, АУП)

## Модели данных

### Employee (Сотрудник)
```go
type Employee struct {
    ID           string
    LastName     string
    FirstName    string
    MiddleName   string
    BirthDate    string
    Gender       string
    Phone        string
    Email        string
    Address      string
    PositionID   string
    DepartmentID string
    EmploymentType string
    Rate         float64
    HireDate     string
    Education    string
    Degree       string
    Rank         string
    PassportSeries string
    PassportNumber  string
    INN          string
    SNILS        string
}
```

### Department (Кафедра)
```go
type Department struct {
    ID          string
    Name        string
    ShortName   string
    HeadID      string
    Description string
}
```

### Position (Должность)
```go
type Position struct {
    ID          string
    Name        string
    ShortName   string
    Category    string // ППС, УВП, АУП
}
```
