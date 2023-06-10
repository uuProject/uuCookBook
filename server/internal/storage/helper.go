package storage

import (
	"fmt"

	"github.com/google/uuid"
)

func recipePath(path string, uniqueIdentifier uuid.UUID) string {
	return fmt.Sprintf("%s/%s/%s%s", path, recipesDir, uniqueIdentifier, jsonFileExtension)
}

func unitPath(path string, uniqueIdentifier uuid.UUID) string {
	return fmt.Sprintf("%s/%s/%s%s", path, unitsDir, uniqueIdentifier, jsonFileExtension)
}

func imagePath(path string, uniqueIdentifier uuid.UUID) string {
	return fmt.Sprintf("%s/%s/%s", path, imagesDir, uniqueIdentifier)
}
