package storage

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/google/uuid"
)

type Storage interface {
	Recipes() ([]Recipe, error)
	AddRecipe(uniqueIdentifier uuid.UUID, recipe *Recipe) error
	Recipe(uniqueIdentifier uuid.UUID) (*Recipe, error)
	UpdateRecipe(uniqueIdentifier uuid.UUID, recipe *Recipe) (*Recipe, error)
	DeleteRecipe(uniqueIdentifier uuid.UUID) error

	Units() ([]Unit, error)
	Unit(uniqueIdentifier uuid.UUID) (*Unit, error)
}

const (
	jsonFileExtension = ".json"

	recipesDir = "recipes"
	unitsDir   = "units"
	imagesDir  = "images"
)

var (
	ErrFileNotFound      = errors.New("file not found")
	ErrFileAlreadyExists = errors.New("file already exists")
)

type storage struct {
	path string
}

func (s *storage) Recipes() ([]Recipe, error) {
	dir, err := os.ReadDir(fmt.Sprintf("%s/%s", s.path, recipesDir))
	if err != nil {
		return nil, err
	}

	var recipes []Recipe

	for _, file := range dir {
		uniqueIdentifier, err := uuid.Parse(strings.TrimSuffix(file.Name(), jsonFileExtension))
		if err != nil {
			return nil, err
		}

		b, err := os.ReadFile(recipePath(s.path, uniqueIdentifier))
		if err != nil {
			return nil, err
		}

		var recipe Recipe

		if err := json.Unmarshal(b, &recipe); err != nil {
			return nil, err
		}

		recipes = append(recipes, recipe)
	}

	return recipes, err
}

func (s *storage) AddRecipe(uniqueIdentifier uuid.UUID, recipe *Recipe) error {
	initialRead, err := os.ReadFile(recipePath(s.path, uniqueIdentifier))
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return err
	}

	if initialRead != nil {
		return ErrFileAlreadyExists
	}

	b, err := json.Marshal(recipe)
	if err != nil {
		return err
	}

	p := recipePath(s.path, uniqueIdentifier)

	if err := os.WriteFile(p, b, os.ModePerm); err != nil {
		return err
	}

	return err
}

func (s *storage) Recipe(uniqueIdentifier uuid.UUID) (*Recipe, error) {
	b, err := os.ReadFile(recipePath(s.path, uniqueIdentifier))
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, ErrFileNotFound
		}

		return nil, err
	}

	var recipe Recipe

	if err := json.Unmarshal(b, &recipe); err != nil {
		return nil, err
	}

	return &recipe, err
}

func (s *storage) UpdateRecipe(uniqueIdentifier uuid.UUID, recipe *Recipe) (*Recipe, error) {
	if _, err := os.ReadFile(recipePath(s.path, uniqueIdentifier)); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, ErrFileNotFound
		}

		return nil, err
	}

	b, err := json.Marshal(recipe)
	if err != nil {
		return nil, err
	}

	p := recipePath(s.path, uniqueIdentifier)

	if err := os.WriteFile(p, b, os.ModePerm); err != nil {
		return nil, err
	}

	updatedRead, err := os.ReadFile(p)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, ErrFileNotFound
		}

		return nil, err
	}

	var updatedRecipe Recipe

	if err := json.Unmarshal(updatedRead, &updatedRecipe); err != nil {
		return nil, err
	}

	return &updatedRecipe, err
}

func (s *storage) DeleteRecipe(uniqueIdentifier uuid.UUID) error {
	if err := os.Remove(recipePath(s.path, uniqueIdentifier)); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return ErrFileNotFound
		}

		return err
	}

	return nil
}

func (s *storage) Units() ([]Unit, error) {
	dir, err := os.ReadDir(fmt.Sprintf("%s/%s", s.path, unitsDir))
	if err != nil {
		return nil, err
	}

	var units []Unit

	for _, file := range dir {
		uniqueIdentifier, err := uuid.Parse(strings.TrimSuffix(file.Name(), jsonFileExtension))
		if err != nil {
			return nil, err
		}

		b, err := os.ReadFile(unitPath(s.path, uniqueIdentifier))
		if err != nil {
			return nil, err
		}

		var unit Unit

		if err := json.Unmarshal(b, &unit); err != nil {
			return nil, err
		}

		units = append(units, unit)
	}

	return units, err
}

func (s *storage) Unit(uniqueIdentifier uuid.UUID) (*Unit, error) {
	b, err := os.ReadFile(unitPath(s.path, uniqueIdentifier))
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil, ErrFileNotFound
		}

		return nil, err
	}

	var unit Unit

	if err := json.Unmarshal(b, &unit); err != nil {
		return nil, err
	}

	return &unit, err
}

func New(path string) Storage {
	return &storage{
		path: path,
	}
}
