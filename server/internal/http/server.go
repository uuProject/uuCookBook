package http

import (
	"fmt"
	"log"
	"net/http"

	"server/internal/storage"
)

type Server interface {
	ListenAndServe() error
	Close() error
}

type server struct {
	srv *http.Server
}

func NewServer(address string, st storage.Storage) Server {
	return &server{
		srv: &http.Server{
			Addr: address,
			Handler: newRouter(
				newHandler(st),
			),
		},
	}
}

func (s *server) ListenAndServe() error {
	log.Println(fmt.Sprintf("http server started listening at address: %s", s.srv.Addr))
	defer log.Println(fmt.Sprintf("http server stopped listening at address: %s", s.srv.Addr))

	if err := s.srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		return err
	}

	return nil
}

func (s *server) Close() error {
	log.Println(fmt.Sprintf("http server closing at address: %s ", s.srv.Addr))
	defer log.Println(fmt.Sprintf("http server closed at address: %s", s.srv.Addr))

	if err := s.srv.Close(); err != nil {
		return err
	}

	return nil
}
