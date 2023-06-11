package fileserver

import (
	"fmt"
	"log"
	"net/http"
)

type Server interface {
	ListenAndServe() error
	Close() error
}

type server struct {
	srv *http.Server
}

func New(address string, imagesPath string) *server {
	return &server{
		srv: &http.Server{
			Addr: address,
			Handler: http.FileServer(
				http.Dir(imagesPath),
			),
		},
	}
}

func (s *server) ListenAndServe() error {
	log.Println(fmt.Sprintf("file server started listening at address: %s", s.srv.Addr))
	defer log.Println(fmt.Sprintf("file server stopped listening at address: %s", s.srv.Addr))

	if err := s.srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		return err
	}

	return nil
}

func (s *server) Close() error {
	log.Println(fmt.Sprintf("file server closing at address: %s ", s.srv.Addr))
	defer log.Println(fmt.Sprintf("file server closed at address: %s", s.srv.Addr))

	if err := s.srv.Close(); err != nil {
		return err
	}

	return nil
}
