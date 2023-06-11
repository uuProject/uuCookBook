package http

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

const (
	headerContentType     = "Content-Type"
	headerContentTypeJson = "application/json"
)

func WriteNoContent(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNoContent)
}

func WriteJson(w http.ResponseWriter, statusCode int, body interface{}) {
	content, err := json.Marshal(body)
	if err != nil {
		WriteInternalServerError(w, err)
		return
	}

	w.Header().Set(headerContentType, headerContentTypeJson)
	w.WriteHeader(statusCode)

	if _, err := w.Write(content); err != nil {
		log.Println(fmt.Errorf("write http response err: %w", err))
	}
}

type errorResponse struct {
	Error string `json:"error"`
}

func WriteBadRequestError(w http.ResponseWriter, err error) {
	WriteJson(w, http.StatusBadRequest, errorResponse{Error: err.Error()})
}

func WriteNotFoundError(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
}

func WriteConflictError(w http.ResponseWriter) {
	w.WriteHeader(http.StatusConflict)
}

func WriteInternalServerError(w http.ResponseWriter, err error) {
	log.Println(fmt.Errorf("internal server err: %w", err))
	w.WriteHeader(http.StatusInternalServerError)
}
