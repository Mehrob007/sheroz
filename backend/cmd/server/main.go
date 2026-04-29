package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mechmath/faculty-staff/internal/config"
	"github.com/mechmath/faculty-staff/internal/handlers"
)

func main() {
	// Загружаем конфигурацию
	cfg := config.DefaultConfig()

	// Подключаемся к MongoDB
	if err := config.ConnectMongo(cfg.MongoURI, cfg.MongoDB); err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer config.DisconnectMongo()

	// Создаем роутер
	router := gin.Default()

	// CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// API routes
	api := router.Group("/api")
	{
		// Employees
		employeeHandler := handlers.NewEmployeeHandler()
		employees := api.Group("/employees")
		{
			employees.GET("", employeeHandler.GetAllEmployees)
			employees.POST("", employeeHandler.CreateEmployee)
			employees.GET("/search", employeeHandler.SearchEmployees)
			employees.GET("/:id", employeeHandler.GetEmployeeByID)
			employees.PUT("/:id", employeeHandler.UpdateEmployee)
			employees.DELETE("/:id", employeeHandler.DeleteEmployee)
		}

		// Departments
		departmentHandler := handlers.NewDepartmentHandler()
		departments := api.Group("/departments")
		{
			departments.GET("", departmentHandler.GetAllDepartments)
			departments.POST("", departmentHandler.CreateDepartment)
			departments.GET("/:departmentId/employees", employeeHandler.GetEmployeesByDepartment)
		}

		// Positions
		positionHandler := handlers.NewPositionHandler()
		positions := api.Group("/positions")
		{
			positions.GET("", positionHandler.GetAllPositions)
			positions.POST("", positionHandler.CreatePosition)
		}

		// Health check
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{"status": "ok"})
		})

		// Seed initial data
		api.POST("/seed", seedData)
	}

	// Запускаем сервер
	log.Printf("Server starting on port %s...", cfg.ServerPort)
	if err := router.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// seedData заполняет базу начальными данными
func seedData(c *gin.Context) {
	// Кафедры мехмата
	departments := []map[string]interface{}{
		{"name": "Кафедра математического анализа", "short_name": "МА"},
		{"name": "Кафедра алгебры и математической логики", "short_name": "АиМЛ"},
		{"name": "Кафедра дифференциальных уравнений", "short_name": "ДУ"},
		{"name": "Кафедра вычислительной математики", "short_name": "ВМ"},
		{"name": "Кафедра математического моделирования", "short_name": "ММ"},
		{"name": "Кафедра теоретической механики", "short_name": "ТМ"},
		{"name": "Кафедра информатики", "short_name": "ИНФ"},
	}

	collection := config.DB.Collection("departments")
	for _, dept := range departments {
		collection.InsertOne(c, dept)
	}

	// Должности
	positions := []map[string]interface{}{
		{"name": "Профессор", "short_name": "проф.", "category": "ППС"},
		{"name": "Доцент", "short_name": "доц.", "category": "ППС"},
		{"name": "Старший преподаватель", "short_name": "ст.преп.", "category": "ППС"},
		{"name": "Ассистент", "short_name": "асс.", "category": "ППС"},
		{"name": "Заведующий кафедрой", "short_name": "зав.каф.", "category": "ППС"},
		{"name": "Декан", "short_name": "дек.", "category": "АУП"},
		{"name": "Заместитель декана", "short_name": "зам.дек.", "category": "АУП"},
		{"name": "Инженер", "short_name": "инж.", "category": "УВП"},
		{"name": "Лаборант", "short_name": "лаб.", "category": "УВП"},
		{"name": "Секретарь", "short_name": "секр.", "category": "УВП"},
	}

	collection = config.DB.Collection("positions")
	for _, pos := range positions {
		collection.InsertOne(c, pos)
	}

	c.JSON(200, gin.H{
		"message":      "Данные успешно добавлены",
		"departments":  len(departments),
		"positions":    len(positions),
	})
}
