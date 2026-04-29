package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Config struct {
	MongoURI    string
	MongoDB     string
	ServerPort  string
}

var (
	MongoClient *mongo.Client
	DB          *mongo.Database
)

// DefaultConfig возвращает конфигурацию по умолчанию
func DefaultConfig() *Config {
	return &Config{
		MongoURI:   "mongodb://localhost:27017",
		MongoDB:    "mechmath_staff",
		ServerPort: "8080",
	}
}

// ConnectMongo подключается к MongoDB
func ConnectMongo(uri, dbName string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}

	// Проверяем подключение
	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	MongoClient = client
	DB = client.Database(dbName)

	log.Println("Connected to MongoDB!")
	return nil
}

// DisconnectMongo отключается от MongoDB
func DisconnectMongo() {
	if MongoClient != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		MongoClient.Disconnect(ctx)
		log.Println("Disconnected from MongoDB")
	}
}
