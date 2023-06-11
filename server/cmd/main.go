package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"server/cmd/config"
	"server/internal/fileserver"
	"server/internal/http"
	"server/internal/storage"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load configuration: %v", err)
	}

	server := http.NewServer(
		cfg.HttpServer.Address,
		storage.New(cfg.Storage.Path),
	)

	defer func() {
		if err := server.Close(); err != nil {
			log.Fatalf("http server close failed: %v", err)
		}
	}()

	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Fatalf("http server listen and server failed: %v", err)
		}
	}()

	fileServer := fileserver.New(
		cfg.FileServer.Address,
		cfg.Storage.ImagesPath,
	)

	defer func() {
		if err := fileServer.Close(); err != nil {
			log.Fatalf("file server close failed: %v", err)
		}
	}()

	go func() {
		if err := fileServer.ListenAndServe(); err != nil {
			log.Fatalf("file server listen and server failed: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit

	log.Println("shutdown successful")
}
