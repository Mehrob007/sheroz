package repository

import (
	"context"
	"time"

	"github.com/mechmath/faculty-staff/internal/config"
	"github.com/mechmath/faculty-staff/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// EmployeeRepository - репозиторий для работы с сотрудниками
type EmployeeRepository struct{}

// NewEmployeeRepository создает новый репозиторий
func NewEmployeeRepository() *EmployeeRepository {
	return &EmployeeRepository{}
}

// GetAll возвращает всех сотрудников
func (r *EmployeeRepository) GetAll() ([]models.Employee, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var employees []models.Employee
	collection := config.DB.Collection("employees")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &employees); err != nil {
		return nil, err
	}

	return employees, nil
}

// GetByID возвращает сотрудника по ID
func (r *EmployeeRepository) GetByID(id string) (*models.Employee, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var employee models.Employee
	collection := config.DB.Collection("employees")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&employee)
	if err != nil {
		return nil, err
	}

	return &employee, nil
}

// Create создает нового сотрудника
func (r *EmployeeRepository) Create(employee *models.Employee) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := config.DB.Collection("employees")

	employee.CreatedAt = time.Now()
	employee.UpdatedAt = time.Now()

	result, err := collection.InsertOne(ctx, employee)
	if err != nil {
		return err
	}

	employee.ID = result.InsertedID.(primitive.ObjectID).Hex()
	return nil
}

// Update обновляет сотрудника
func (r *EmployeeRepository) Update(id string, employee *models.Employee) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := config.DB.Collection("employees")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	employee.UpdatedAt = time.Now()

	update := bson.M{"$set": employee}
	_, err = collection.UpdateByID(ctx, objectID, update)
	return err
}

// Delete удаляет сотрудника
func (r *EmployeeRepository) Delete(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := config.DB.Collection("employees")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}

// GetByDepartment возвращает сотрудников кафедры
func (r *EmployeeRepository) GetByDepartment(departmentID string) ([]models.Employee, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var employees []models.Employee
	collection := config.DB.Collection("employees")

	cursor, err := collection.Find(ctx, bson.M{"department_id": departmentID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &employees); err != nil {
		return nil, err
	}

	return employees, nil
}

// Search ищет сотрудников по имени
func (r *EmployeeRepository) Search(query string) ([]models.Employee, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var employees []models.Employee
	collection := config.DB.Collection("employees")

	filter := bson.M{
		"$or": []bson.M{
			{"last_name": bson.M{"$regex": query, "$options": "i"}},
			{"first_name": bson.M{"$regex": query, "$options": "i"}},
			{"middle_name": bson.M{"$regex": query, "$options": "i"}},
		},
	}

	cursor, err := collection.Find(ctx, filter, options.Find().SetLimit(20))
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &employees); err != nil {
		return nil, err
	}

	return employees, nil
}

// DepartmentRepository - репозиторий для работы с кафедрами
type DepartmentRepository struct{}

func NewDepartmentRepository() *DepartmentRepository {
	return &DepartmentRepository{}
}

func (r *DepartmentRepository) GetAll() ([]models.Department, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var departments []models.Department
	collection := config.DB.Collection("departments")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &departments); err != nil {
		return nil, err
	}

	return departments, nil
}

func (r *DepartmentRepository) Create(dept *models.Department) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := config.DB.Collection("departments")
	dept.CreatedAt = time.Now()
	dept.UpdatedAt = time.Now()

	result, err := collection.InsertOne(ctx, dept)
	if err != nil {
		return err
	}

	dept.ID = result.InsertedID.(primitive.ObjectID).Hex()
	return nil
}

// PositionRepository - репозиторий для работы с должностями
type PositionRepository struct{}

func NewPositionRepository() *PositionRepository {
	return &PositionRepository{}
}

func (r *PositionRepository) GetAll() ([]models.Position, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var positions []models.Position
	collection := config.DB.Collection("positions")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &positions); err != nil {
		return nil, err
	}

	return positions, nil
}

func (r *PositionRepository) Create(pos *models.Position) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := config.DB.Collection("positions")
	pos.CreatedAt = time.Now()
	pos.UpdatedAt = time.Now()

	result, err := collection.InsertOne(ctx, pos)
	if err != nil {
		return err
	}

	pos.ID = result.InsertedID.(primitive.ObjectID).Hex()
	return nil
}
