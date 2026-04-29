package models

import "time"

// Employee - сотрудник факультета
type Employee struct {
	ID           string    `json:"id" bson:"_id,omitempty"`
	LastName     string    `json:"last_name" bson:"last_name"`
	FirstName    string    `json:"first_name" bson:"first_name"`
	MiddleName   string    `json:"middle_name" bson:"middle_name"`
	BirthDate    string    `json:"birth_date" bson:"birth_date"`
	Gender       string    `json:"gender" bson:"gender"`
	Phone        string    `json:"phone" bson:"phone"`
	Email        string    `json:"email" bson:"email"`
	Address      string    `json:"address" bson:"address"`
	
	// Должность
	PositionID   string    `json:"position_id" bson:"position_id"`
	PositionName string    `json:"position_name" bson:"-"` // Для отображения
	DepartmentID string    `json:"department_id" bson:"department_id"`
	DepartmentName string  `json:"department_name" bson:"-"` // Для отображения
	EmploymentType string  `json:"employment_type" bson:"employment_type"` // штатный, совместитель
	Rate         float64   `json:"rate" bson:"rate"` // ставка (0.25, 0.5, 1.0)
	HireDate     string    `json:"hire_date" bson:"hire_date"`
	FireDate     string    `json:"fire_date,omitempty" bson:"fire_date,omitempty"`
	
	// Образование
	Education    string    `json:"education" bson:"education"` // высшее, среднее
	Degree       string    `json:"degree" bson:"degree"` // кандидат наук, доктор наук
	Rank         string    `json:"rank" bson:"rank"` // доцент, профессор
	
	// Документы
	PassportSeries string  `json:"passport_series" bson:"passport_series"`
	PassportNumber  string `json:"passport_number" bson:"passport_number"`
	INN            string  `json:"inn" bson:"inn"`
	SNILS          string  `json:"snils" bson:"snils"`
	
	// Метаданные
	CreatedAt    time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" bson:"updated_at"`
}

// Department - кафедра/отдел
type Department struct {
	ID          string    `json:"id" bson:"_id,omitempty"`
	Name        string    `json:"name" bson:"name"`
	ShortName   string    `json:"short_name" bson:"short_name"`
	HeadID      string    `json:"head_id" bson:"head_id"` // Заведующий
	Description string    `json:"description" bson:"description"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at"`
}

// Position - должность
type Position struct {
	ID          string    `json:"id" bson:"_id,omitempty"`
	Name        string    `json:"name" bson:"name"`
	ShortName   string    `json:"short_name" bson:"short_name"`
	Category    string    `json:"category" bson:"category"` // ППС, УВП, АУП
	SalaryRange string    `json:"salary_range" bson:"salary_range"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at"`
}
