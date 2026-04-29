package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mechmath/faculty-staff/internal/models"
	"github.com/mechmath/faculty-staff/internal/repository"
)

type EmployeeHandler struct {
	repo *repository.EmployeeRepository
}

func NewEmployeeHandler() *EmployeeHandler {
	return &EmployeeHandler{
		repo: repository.NewEmployeeRepository(),
	}
}

// GetAllEmployees godoc
// @Summary Получить всех сотрудников
// @Description Возвращает список всех сотрудников
// @Tags employees
// @Produce json
// @Success 200 {array} models.Employee
// @Router /employees [get]
func (h *EmployeeHandler) GetAllEmployees(c *gin.Context) {
	employees, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, employees)
}

// GetEmployeeByID godoc
// @Summary Получить сотрудника по ID
// @Description Возвращает сотрудника по ID
// @Tags employees
// @Produce json
// @Param id path string true "ID сотрудника"
// @Success 200 {object} models.Employee
// @Router /employees/{id} [get]
func (h *EmployeeHandler) GetEmployeeByID(c *gin.Context) {
	id := c.Param("id")

	employee, err := h.repo.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Сотрудник не найден"})
		return
	}

	c.JSON(http.StatusOK, employee)
}

// CreateEmployee godoc
// @Summary Создать сотрудника
// @Description Создает нового сотрудника
// @Tags employees
// @Accept json
// @Produce json
// @Param employee body models.Employee true "Данные сотрудника"
// @Success 201 {object} models.Employee
// @Router /employees [post]
func (h *EmployeeHandler) CreateEmployee(c *gin.Context) {
	var employee models.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.Create(&employee); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, employee)
}

// UpdateEmployee godoc
// @Summary Обновить сотрудника
// @Description Обновляет данные сотрудника
// @Tags employees
// @Accept json
// @Produce json
// @Param id path string true "ID сотрудника"
// @Param employee body models.Employee true "Данные сотрудника"
// @Success 200 {object} models.Employee
// @Router /employees/{id} [put]
func (h *EmployeeHandler) UpdateEmployee(c *gin.Context) {
	id := c.Param("id")

	var employee models.Employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.Update(id, &employee); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	employee.ID = id
	c.JSON(http.StatusOK, employee)
}

// DeleteEmployee godoc
// @Summary Удалить сотрудника
// @Description Удаляет сотрудника по ID
// @Tags employees
// @Param id path string true "ID сотрудника"
// @Success 200 {object} map[string]interface{}
// @Router /employees/{id} [delete]
func (h *EmployeeHandler) DeleteEmployee(c *gin.Context) {
	id := c.Param("id")

	if err := h.repo.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Сотрудник удален"})
}

// SearchEmployees godoc
// @Summary Поиск сотрудников
// @Description Ищет сотрудников по имени
// @Tags employees
// @Produce json
// @Param q query string true "Поисковый запрос"
// @Success 200 {array} models.Employee
// @Router /employees/search [get]
func (h *EmployeeHandler) SearchEmployees(c *gin.Context) {
	query := c.Query("q")

	employees, err := h.repo.Search(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, employees)
}

// GetEmployeesByDepartment godoc
// @Summary Сотрудники кафедры
// @Description Возвращает сотрудников кафедры
// @Tags employees
// @Produce json
// @Param departmentId path string true "ID кафедры"
// @Success 200 {array} models.Employee
// @Router /departments/{departmentId}/employees [get]
func (h *EmployeeHandler) GetEmployeesByDepartment(c *gin.Context) {
	departmentID := c.Param("departmentId")

	employees, err := h.repo.GetByDepartment(departmentID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, employees)
}

// Department handlers
type DepartmentHandler struct {
	repo *repository.DepartmentRepository
}

func NewDepartmentHandler() *DepartmentHandler {
	return &DepartmentHandler{
		repo: repository.NewDepartmentRepository(),
	}
}

func (h *DepartmentHandler) GetAllDepartments(c *gin.Context) {
	departments, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, departments)
}

func (h *DepartmentHandler) CreateDepartment(c *gin.Context) {
	var dept models.Department

	if err := c.ShouldBindJSON(&dept); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.Create(&dept); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, dept)
}

// Position handlers
type PositionHandler struct {
	repo *repository.PositionRepository
}

func NewPositionHandler() *PositionHandler {
	return &PositionHandler{
		repo: repository.NewPositionRepository(),
	}
}

func (h *PositionHandler) GetAllPositions(c *gin.Context) {
	positions, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, positions)
}

func (h *PositionHandler) CreatePosition(c *gin.Context) {
	var pos models.Position

	if err := c.ShouldBindJSON(&pos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.Create(&pos); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, pos)
}
