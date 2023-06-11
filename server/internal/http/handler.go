package http

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"server/internal/storage"
)

type Handler interface {
	Recipes(w http.ResponseWriter, r *http.Request)
	AddRecipe(w http.ResponseWriter, r *http.Request)
	Recipe(w http.ResponseWriter, r *http.Request)
	UpdateRecipe(w http.ResponseWriter, r *http.Request)
	DeleteRecipe(w http.ResponseWriter, r *http.Request)

	Units(w http.ResponseWriter, r *http.Request)

	AddImage(w http.ResponseWriter, r *http.Request)
}

type handler struct {
	st storage.Storage
}

func (h *handler) Recipes(w http.ResponseWriter, r *http.Request) {
	recipes, err := h.st.Recipes()
	if err != nil {
		WriteInternalServerError(w, err)
		return
	}

	WriteJson(w, http.StatusOK, recipes)
}

func (h *handler) AddRecipe(w http.ResponseWriter, r *http.Request) {
	b, err := io.ReadAll(r.Body)
	if err != nil {
		WriteBadRequestError(w, err)
		return
	}

	var recipe storage.Recipe

	if err := json.Unmarshal(b, &recipe); err != nil {
		WriteBadRequestError(w, err)
		return
	}

	if err := recipe.Validate(); err != nil {
		WriteBadRequestError(w, err)
		return
	}

	for _, ingredient := range recipe.Ingredients {
		if _, err := h.st.Unit(ingredient.UnitUniqueIdentifier); err != nil {
			if errors.Is(err, storage.ErrFileNotFound) {
				WriteNotFoundError(w)
				return
			}

			WriteInternalServerError(w, err)
			return
		}
	}

	if err := h.st.AddRecipe(recipe.UniqueIdentifier, &recipe); err != nil {
		if errors.Is(err, storage.ErrFileAlreadyExists) {
			WriteConflictError(w)
			return
		}

		WriteInternalServerError(w, err)
		return
	}

	WriteNoContent(w)
}

func (h *handler) Recipe(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	uniqueIdentifier, err := uuid.Parse(id)
	if err != nil {
		WriteBadRequestError(w, fmt.Errorf("invalid uuid identifier %q", id))
		return
	}

	recipe, err := h.st.Recipe(uniqueIdentifier)
	if err != nil {
		if errors.Is(err, storage.ErrFileNotFound) {
			WriteNotFoundError(w)
			return
		}

		WriteInternalServerError(w, err)
		return
	}

	WriteJson(w, http.StatusOK, recipe)
}

func (h *handler) UpdateRecipe(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	uniqueIdentifier, err := uuid.Parse(id)
	if err != nil {
		WriteBadRequestError(w, fmt.Errorf("invalid uuid identifier %q", id))
		return
	}

	b, err := io.ReadAll(r.Body)
	if err != nil {
		WriteBadRequestError(w, err)
		return
	}

	var recipe storage.Recipe

	if err := json.Unmarshal(b, &recipe); err != nil {
		WriteBadRequestError(w, err)
		return
	}

	if err := recipe.Validate(); err != nil {
		WriteBadRequestError(w, err)
		return
	}

	for _, ingredient := range recipe.Ingredients {
		if _, err := h.st.Unit(ingredient.UnitUniqueIdentifier); err != nil {
			if errors.Is(err, storage.ErrFileNotFound) {
				WriteNotFoundError(w)
				return
			}

			WriteInternalServerError(w, err)
			return
		}
	}

	updatedRecipe, err := h.st.UpdateRecipe(uniqueIdentifier, &recipe)
	if err != nil {
		if errors.Is(err, storage.ErrFileNotFound) {
			WriteNotFoundError(w)
			return
		}

		WriteInternalServerError(w, err)
		return
	}

	WriteJson(w, http.StatusOK, updatedRecipe)
}

func (h *handler) DeleteRecipe(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	uniqueIdentifier, err := uuid.Parse(id)
	if err != nil {
		WriteBadRequestError(w, fmt.Errorf("invalid uuid identifier %q", id))
		return
	}

	if err := h.st.DeleteRecipe(uniqueIdentifier); err != nil {
		if errors.Is(err, storage.ErrFileNotFound) {
			WriteNotFoundError(w)
			return
		}

		WriteInternalServerError(w, err)
		return
	}

	if err := h.st.DeleteImage(uniqueIdentifier); err != nil {
		if errors.Is(err, storage.ErrFileNotFound) {
			WriteNotFoundError(w)
			return
		}

		WriteInternalServerError(w, err)
		return
	}

	WriteNoContent(w)
}

func (h *handler) Units(w http.ResponseWriter, r *http.Request) {
	recipes, err := h.st.Units()
	if err != nil {
		WriteInternalServerError(w, err)
		return
	}

	WriteJson(w, http.StatusOK, recipes)
}

func (h *handler) AddImage(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		WriteInternalServerError(w, err)
		return
	}

	image, header, err := r.FormFile("image")
	if err != nil {
		WriteBadRequestError(w, err)
		return
	}
	defer func() {
		image.Close()
	}()

	var imageBuff = new(bytes.Buffer)

	if _, err := io.Copy(imageBuff, image); err != nil {
		WriteInternalServerError(w, err)
		return
	}

	if err := h.st.AddImage(header.Filename, imageBuff); err != nil {
		WriteInternalServerError(w, err)
		return
	}

	WriteNoContent(w)
}

func newHandler(st storage.Storage) Handler {
	return &handler{
		st: st,
	}
}
