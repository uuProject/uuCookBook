package storage

import (
	"fmt"
	"strings"

	"github.com/google/uuid"
)

type Recipe struct {
	UniqueIdentifier uuid.UUID    `json:"uniqueIdentifier"`
	Name             string       `json:"name"`
	Description      string       `json:"description"`
	PreparationTime  uint64       `json:"preparationTime"`
	Servings         uint64       `json:"servings"`
	Image            string       `json:"image"`
	Ingredients      []Ingredient `json:"ingredients"`
}

func (r *Recipe) Validate() error {
	nameLen := len(r.Name)
	if nameLen == 0 || nameLen > 30 {
		return fmt.Errorf("recipe name invalid lenght '%d', min 1, max 30", nameLen)
	}

	descriptionLen := len(r.Description)
	if descriptionLen == 0 || descriptionLen > 250 {
		return fmt.Errorf("recipe description invalid lenght '%d', min 1, max 250", descriptionLen)
	}

	if r.PreparationTime <= 0 || r.PreparationTime > 10080 {
		return fmt.Errorf("recipe preparation time invalid value '%d', min 1, max 10800", r.PreparationTime)
	}

	if r.Servings <= 0 || r.Servings > 100 {
		return fmt.Errorf("recipe preparation time invalid value '%d', min 1, max 100", r.Servings)
	}

	if !strings.HasSuffix(r.Image, ".png") && !strings.HasSuffix(r.Image, ".jpeg") && !strings.HasSuffix(r.Image, ".jpg") {
		return fmt.Errorf("invalid image file extension, requires .png, .jpeg, .jpg")
	}

	// TODO: missing validation that uuid of image and unique identifier of recipe match

	ingredientsLen := len(r.Ingredients)
	if ingredientsLen == 0 || ingredientsLen > 20 {
		return fmt.Errorf("recipe ingredients invalid length '%d', min 1, max 20", ingredientsLen)
	}

	for _, ingredient := range r.Ingredients {
		ingredientNameLen := len(ingredient.Name)
		if ingredientNameLen == 0 || ingredientNameLen > 30 {
			return fmt.Errorf("recipe ingredient name invalid lenght '%d', min 1, max 30", ingredientNameLen)
		}

		ingredientDescriptionLen := len(ingredient.Description)
		if ingredientDescriptionLen > 100 {
			return fmt.Errorf("recipe ingredient description invalid lenght '%d', min 1, max 250", ingredientDescriptionLen)
		}

		if ingredient.Amount <= 0 || ingredient.Amount > 50 {
			return fmt.Errorf("recipe ingredient amount invalid value '%d', min 1, max 50", ingredient.Amount)
		}
	}

	return nil
}

type Ingredient struct {
	Name                 string    `json:"name"`
	Description          string    `json:"description"`
	Amount               float64   `json:"amount"`
	UnitUniqueIdentifier uuid.UUID `json:"unitUniqueIdentifier"`
}

type Unit struct {
	UniqueIdentifier uuid.UUID `json:"uniqueIdentifier"`
	Shortcut         string    `json:"shortcut"`
}
